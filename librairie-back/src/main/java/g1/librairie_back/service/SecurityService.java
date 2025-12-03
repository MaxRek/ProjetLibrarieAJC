package g1.librairie_back.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import g1.librairie_back.config.JwtUtil;
import g1.librairie_back.dto.request.AuthCompteRequest;
import g1.librairie_back.dto.response.AuthCompteResponse;

@Service
public class SecurityService {
    private final static Logger log = LoggerFactory.getLogger(SecurityService.class);
    private final AuthenticationManager authenticationManager;

    public SecurityService(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public AuthCompteResponse auth(AuthCompteRequest authRequest) {
        try {
            log.debug("Trying to authenticate ...");

            Authentication authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);

            log.debug("Successfuly authenticated!" + authentication.getAuthorities());

            return new AuthCompteResponse(true, JwtUtil.generate(authentication));
        }

        catch (BadCredentialsException ex) {
            log.error("Can't authenticate : bad credentials.");
        }

        catch (Exception ex) {
            log.error("Can't authenticate : unknown error ({}).", ex.getClass().getSimpleName());
        }

        return new AuthCompteResponse(false, "");
    }
}
