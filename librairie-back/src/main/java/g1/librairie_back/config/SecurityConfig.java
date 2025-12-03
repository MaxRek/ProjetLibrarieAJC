package g1.librairie_back.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {
    
    // Le SecurityFilterChain va nous permettre de configurer les accès, éventuellement le CSRF, politiques CORS générales, etc.
    @Bean // On bypass la config auto-configuration
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Configurer ici les accès généraux
        http.authorizeHttpRequests(auth -> {
            /*auth.requestMatchers("/api/compte*").permitAll();
            auth.requestMatchers("/api/matiere").hasRole("USER");
            auth.requestMatchers("/api/client").hasRole("ADMIN");*/

            // auth.requestMatchers("/api/matiere").hasAuthority("ROLE_USER");

            auth.requestMatchers("/**").permitAll();
        });

        // Activer le formulaire de connexion
        http.formLogin(Customizer.withDefaults());

        // Activer l'authentification par HTTP Basic
        http.httpBasic(Customizer.withDefaults());

        // Désactiver la protection CSRF
        http.csrf().disable();      
        
        http.cors(cors -> {
            CorsConfigurationSource source = request -> {
                CorsConfiguration config = new CorsConfiguration();



                
                config.setAllowedHeaders(List.of("*"));                
                config.setAllowedOrigins(List.of("http://localhost:4200"));
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

                return config;
            };
            cors.configurationSource(source);
        });

        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        // return NoOpPasswordEncoder.getInstance(); // PAS BIEN

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        System.out.println("\r\nMot de passe ===> " + passwordEncoder.encode("123456") + "\r\n");

        return passwordEncoder;
    }
}
