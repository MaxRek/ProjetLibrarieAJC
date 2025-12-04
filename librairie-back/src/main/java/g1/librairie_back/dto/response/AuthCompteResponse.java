package g1.librairie_back.dto.response;

public record AuthCompteResponse (boolean sucess, String token, String role, String idClient) {

}
