package g1.librairie_back.config;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;
import g1.librairie_back.service.SecurityService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtHeaderFilter extends OncePerRequestFilter {
    private final IDAOCompte dao;
    private final static Logger log = LoggerFactory.getLogger(SecurityService.class);


    public JwtHeaderFilter(IDAOCompte dao) {
        this.dao = dao;
    }

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");
        System.out.println(" le token = "+token);

        if (token != null) {
            token = token.substring(7);
            log.info(token);


            Optional<String> optEmail = JwtUtil.getEmail(token);

            if (optEmail.isPresent() && this.dao != null) {
                Compte compte = this.dao.findByEmail(optEmail.get()).orElseThrow();
                List<SimpleGrantedAuthority> authorities = new ArrayList<>();

                if(compte instanceof Client) {
                    authorities.add(new SimpleGrantedAuthority("ROLE_CLIENT"));
                } else {
                    authorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));
                }

                Authentication authentication = new UsernamePasswordAuthenticationToken(optEmail.get(), null, authorities);

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // On passe au filtre suivant ...
        filterChain.doFilter(request, response);
    }
}
