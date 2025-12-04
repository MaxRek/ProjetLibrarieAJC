package g1.librairie_back.rest;

import java.util.Date;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import g1.librairie_back.dao.IDAOCompte;
import g1.librairie_back.dto.request.AuthCompteRequest;
import g1.librairie_back.dto.request.CreateClientRequest;
import g1.librairie_back.dto.response.AuthCompteResponse;
import g1.librairie_back.model.Client;
import g1.librairie_back.model.Compte;
import g1.librairie_back.service.SecurityService;



@RestController
@RequestMapping("/api/compte")
public class CompteRestController {
    private final SecurityService service;
    private final static Logger log = LoggerFactory.getLogger(SecurityService.class);


    public CompteRestController(SecurityService service) {
        this.service = service;
    }
    
    @Autowired
    private IDAOCompte dao;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping
    public Compte enregistrerCompte(@RequestBody CreateClientRequest request) {
        String encodedPassword = this.passwordEncoder.encode(request.getPassword());
        
        Client client = new Client();
        BeanUtils.copyProperties(request, client);

        client.setPassword(encodedPassword);

        this.dao.save(client);

        return client;
    }
    
    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/connexion")
    public AuthCompteResponse connexion(@RequestBody AuthCompteRequest request ){
        log.info("Tentative de connection");
        return this.service.auth(request);
    }
}
