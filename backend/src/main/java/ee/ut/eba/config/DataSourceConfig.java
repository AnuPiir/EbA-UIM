// DataSourceConfig.java
package ee.ut.eba.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;

import javax.sql.DataSource;
import java.io.File;
import java.nio.file.Paths;

@Configuration
@EntityScan("ee.ut.eba.*")
@EnableJpaRepositories(value = "ee.ut.eba.*")
public class DataSourceConfig {

	@Autowired
	Environment env;

	@Bean
	public DataSource dataSource() {
		DriverManagerDataSource dataSource = new DriverManagerDataSource();
		dataSource.setDriverClassName("org.sqlite.JDBC");

		String resourcesPath = new File(System.getProperty("user.dir")).getParent();
		String appDataDir = Paths.get(resourcesPath, "app", "database.db").toString();

		/*// Create a user-writable path for the database
		String userHome = System.getProperty("user.home");
		String appDataDir = Paths.get(userHome, "Documents", "EBAM").toString();*/

		// Ensure the directory exists
		File directory = new File(appDataDir);
		if (!directory.exists()) {
			directory.mkdirs();
		}

		String dbPath = Paths.get(appDataDir, "database.db").toString();
		dataSource.setUrl("jdbc:sqlite:" + dbPath);

		return dataSource;
	}
	@Bean("transactionManager")
	public JpaTransactionManager transactionManager() {
		return new JpaTransactionManager();
	}
}