package ee.ut.eba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;
import java.util.Collections;

@SpringBootApplication
public class SpringAngularDemoApplication {

	public static void main(String[] args) throws IOException {
		//Runtime rt = Runtime.getRuntime();
		//String url = "http://localhost:8080";
		//rt.exec("open " + url);
		SpringApplication app = new SpringApplication(SpringAngularDemoApplication.class);
		app.setDefaultProperties(Collections.singletonMap("server.port", "8080"));
		app.run(args);
	}

	private static void createAndShowGUI() {
		JFrame frame = new JFrame("Click the window to exit application");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(400, 300);


		JButton exitButton = new JButton("Exit Application");
		frame.add(exitButton);

		exitButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				System.exit(0);
			}
		});


		frame.setVisible(true);
	}
}
