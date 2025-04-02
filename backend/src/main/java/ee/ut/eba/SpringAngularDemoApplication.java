package ee.ut.eba;

import java.util.Collections;
import javax.swing.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringAngularDemoApplication {

	public static void main(String[] args) {
		SpringApplication app = new SpringApplication(SpringAngularDemoApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
		app.run(args);
	}
}
