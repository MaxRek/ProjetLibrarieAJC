package g1.librairie_back.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreateClientRequest;
import g1.librairie_back.model.Client;
import g1.librairie_back.service.CompteService;
import g1.librairie_back.view.Views;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/client")
@CrossOrigin("*")
public class ClientRestController {
	private static final Logger log = LoggerFactory.getLogger(ClientRestController.class);

	@Autowired
	CompteService CompteSrv;

	@JsonView(Views.Client.class)
	@GetMapping
	public List<Client> allClients() {
		log.info("GET /api/Client - allClients() called");

		List<Client> Clients = CompteSrv.getAllClients();

		log.info("GET /api/Client - allClients() returned {} clients", Clients != null ? Clients.size() : 0);

		return Clients;
	}

	@JsonView(Views.Client.class)
	@GetMapping("/{id}")
	public ResponseEntity<Client> ficheClient(@PathVariable Integer id, Client Client) {
		log.info("GET /api/Client/{} - ficheClient() called", id);
		Client f = CompteSrv.getClientById(id);

		if (f == null) {
			log.info("GET /api/Client/{} - ficheClient() - client not found", id);
			return ResponseEntity.notFound().build();
		}

		log.info("GET /api/Client/{} - ficheClient() - client found", id);
		return ResponseEntity.ok(f);
	}

	@PostMapping
	public Integer ajoutClient(@Valid @RequestBody CreateClientRequest request) {
		log.info("POST /api/Client - ajoutClient() called with request: {}", request);

		Client Client = new Client();
		BeanUtils.copyProperties(request, Client);

		CompteSrv.create(Client);

		log.info("POST /api/Client - ajoutClient() created client with id: {}", Client.getId());

		return Client.getId();
	}

	@JsonView(Views.Client.class)
	@PutMapping("/{id}")
	public Client modifierClient(@PathVariable Integer id, @RequestBody Client Client) {
		log.info("PUT /api/Client/{} - modifierClient() called with client: {}", id, Client);

		Client.setId(id);

		log.info("PUT /api/Client/{} - modifierClient() updating client", id);

		return (Client) CompteSrv.update(Client);
	}

	@JsonView(Views.Client.class)
	@DeleteMapping("/{id}")
	public void supprimerClient(@PathVariable Integer id) {
		log.info("DELETE /api/Client/{} - supprimerClient() called", id);
		CompteSrv.deleteById(id);
		log.info("DELETE /api/Client/{} - supprimerClient() completed", id);
	}
}
