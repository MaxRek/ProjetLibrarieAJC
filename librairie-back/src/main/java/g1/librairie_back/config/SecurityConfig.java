package g1.librairie_back.config;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
    
    // Le SecurityFilterChain va nous permettre de configurer les accès, éventuellement le CSRF, politiques CORS générales, etc.
    @Bean // On bypass la config auto-configuration
    SecurityFilterChain filterChain(HttpSecurity http, JwtHeaderFilter jwtFilter) throws Exception {
        // Configurer ici les accès généraux
        http.authorizeHttpRequests(auth -> {
            auth.requestMatchers("/api/compte/**").permitAll();
            auth.requestMatchers("/api/papeterie/**").permitAll();
            auth.requestMatchers("/api/livre").hasAnyRole("CLIENT","ADMIN");
            auth.requestMatchers("/api/client").hasRole("ADMIN");
            auth.requestMatchers("/api/auteur/**").permitAll();
            auth.requestMatchers("/api/achat/**").permitAll();
        });

        // Désactiver la protection CSRF
        http.csrf(csrf -> csrf.disable());

        //desactivation des cookies
        http.sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Positionner le filter JwtHeaderFilter AVANT AuthenticationFilter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        
        //politique CORS
        http.cors(Customizer.withDefaults());

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        UrlBasedCorsConfigurationSource corsSource = new UrlBasedCorsConfigurationSource();
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedHeaders(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        corsConfiguration.setAllowedOrigins(List.of("http://localhost:4200"));

        corsSource.registerCorsConfiguration("/**", corsConfiguration);

        return corsSource;
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        // return NoOpPasswordEncoder.getInstance(); // PAS BIEN
        return new BCryptPasswordEncoder();
    }

    @Bean
    AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
