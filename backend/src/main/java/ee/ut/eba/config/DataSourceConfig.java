package ee.ut.eba.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;


@Configuration
@EntityScan("ee.ut.eba.*")
@EnableJpaRepositories(value = "ee.ut.eba.*")
public class DataSourceConfig {

  @Autowired Environment env;

  @Bean("transactionManager")
  public JpaTransactionManager transactionManager() {
    return new JpaTransactionManager();
  }
}
