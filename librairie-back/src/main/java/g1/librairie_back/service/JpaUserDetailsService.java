package g1.librairie_back.service;

import java.util.Optional;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
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
    @Autowired
    private IDAOCompte dao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
    
        Function<Compte, String> roleMapper = (compte) -> {
            return switch (compte) {
                case Client c    -> "CLIENT";
                case Admin f     -> "ADMIN";
                default          -> "NONE";
            };
        };

        return this.dao.findByEmail(email)
            .map(compte -> User
                    .withUsername(email)
                    .password(compte.getPassword())
                    .roles(roleMapper.apply(compte))
                    .build()
            )
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

}
