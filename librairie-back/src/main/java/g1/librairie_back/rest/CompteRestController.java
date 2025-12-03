package g1.librairie_back.rest;

import java.sql.Date;
import java.time.LocalDate;

import javax.crypto.SecretKey;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.dto.request.CreateClientRequest;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/compte")
public class CompteRestController {
    @Autowired
    private IDAOCompte dao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping
    public Compte enregistrerCompte(@RequestBody CreateClientRequest request) {
        String encodedPassword = this.passwordEncoder.encode(request.getPassword());
        
        Client client = new Client();
        BeanUtils.copyProperties(request, client);

        client.setPassword(encodedPassword);

        this.dao.save(client);

        return client;
    }
    
    @PostMapping("/connexion")
    public String connexion() {
        Date now = new Date(0);
        String key = "6E5A7234753778214125442A472D4B6150645367556B58703273357638792F42";
        SecretKey secretKey = Keys.hmacShaKeyFor(key.getBytes());

        return Jwts.builder()
            .subject("nom utilisateur") // Souvent, c'est le username ici
            .issuedAt(now)
            .expiration(new Date(now.getTime() + 300_000)) // Durée de validité = 5 mins
            .signWith(secretKey)
            .compact() // Le jeton JWT sous forme de String
        ;
    }
}
