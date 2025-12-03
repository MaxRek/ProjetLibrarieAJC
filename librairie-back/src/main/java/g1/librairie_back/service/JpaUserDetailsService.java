package g1.librairie_back.service;

import java.util.function.Function;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.model.Admin;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;


@Service
public class JpaUserDetailsService implements UserDetailsService {
    private final IDAOCompte dao;

    public JpaUserDetailsService(IDAOCompte dao) {
        this.dao = dao;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Function<Compte, String> roleMapper = (compte) -> {
            return switch (compte) {
                case Client s    -> "CLIENT";
                case Admin f     -> "ADMIN";
                default          -> "NONE";
            };
        };
        
        Compte compte = this.dao
            .findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("Email non trouvé"));

        return User.withUsername(email)
            .password(compte.getPassword())
            .roles(roleMapper.apply(compte))
            .build();
    }
}
