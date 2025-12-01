package g1.librairie_back.rest;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;

import g1.librairie_back.dto.request.CreateAdminRequest;
import g1.librairie_back.model.Admin;
import g1.librairie_back.service.CompteService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/admin")
public class AdminRestController {
	private static final Logger log = LoggerFactory.getLogger(AdminRestController.class);

	@Autowired
	CompteService CompteSrv;

	@JsonView(Views.Admin.class)
	@GetMapping
	public List<Admin> allAdmins() {
		log.info("GET /api/Admin - allAdmins() called");

		List<Admin> Admins = CompteSrv.getAllAdmins();

		log.info("GET /api/Admin - allAdmins() returned {} admins", Admins != null ? Admins.size() : 0);

		return Admins;
	}

	@JsonView(Views.Admin.class)
	@GetMapping("/{id}")
	public ResponseEntity<Admin> ficheAdmin(@PathVariable Integer id, Admin Admin) {
		log.info("GET /api/Admin/{} - ficheAdmin() called", id);
		Admin f = CompteSrv.getAdminById(id);

		if (f == null) {
			log.info("GET /api/Admin/{} - ficheAdmin() - admin not found", id);
			return ResponseEntity.notFound().build();
		}

		log.info("GET /api/Admin/{} - ficheAdmin() - admin found", id);
		return ResponseEntity.ok(f);
	}

	@PostMapping
	public Integer ajoutAdmin(@Valid @RequestBody CreateAdminRequest request) {
		log.info("POST /api/Admin - ajoutAdmin() called with request: {}", request);

		Admin Admin = new Admin();
		BeanUtils.copyProperties(request, Admin);

		CompteSrv.create(Admin);

		log.info("POST /api/Admin - ajoutAdmin() created admin with id: {}", Admin.getId());

		return Admin.getId();
	}

	@JsonView(Views.Admin.class)
	@PutMapping("/{id}")
	public Admin modifierAdmin(@PathVariable Integer id, @RequestBody Admin Admin) {
		log.info("PUT /api/Admin/{} - modifierAdmin() called with admin: {}", id, Admin);

		Admin.setId(id);

		log.info("PUT /api/Admin/{} - modifierAdmin() updating admin", id);

		return (Admin) CompteSrv.update(Admin);
	}

	@JsonView(Views.Admin.class)
	@DeleteMapping("/{id}")
	public void supprimerAdmin(@PathVariable Integer id) {
		log.info("DELETE /api/Admin/{} - supprimerAdmin() called", id);
		CompteSrv.deleteById(id);
		log.info("DELETE /api/Admin/{} - supprimerAdmin() completed", id);
	}
}
