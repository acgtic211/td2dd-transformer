import { Injectable } from '@angular/core';
import { DdInfraBuilderService } from './dd-infra-builder.service';

var FileSaver = require('file-saver');
var JSZip = require("jszip");

@Injectable({
  providedIn: 'root',
})
export class DdBuilderService {

  constructor(private ddInfraBuilderService: DdInfraBuilderService) { }

  parsedTd;
  wotnectivityReq = [];

  private buildDiscovery() {

    var discovery_mvn = new Blob(['<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>discovery</artifactId><version>0.0.1-SNAPSHOT</version><name>Discovery Server</name><description>Discovery service</description><properties><java.version>1.8</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-starter-netflix-eureka-server</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope><exclusions><exclusion><groupId>org.junit.vintage</groupId><artifactId>junit-vintage-engine</artifactId></exclusion></exclusions></dependency></dependencies><dependencyManagement><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-dependencies</artifactId><version>${spring-cloud.version}</version><type>pom</type><scope>import</scope></dependency></dependencies></dependencyManagement><build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build><repositories><repository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></repository><repository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></repository></repositories><pluginRepositories><pluginRepository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></pluginRepository><pluginRepository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></pluginRepository></pluginRepositories></project>'], { type: "text/plain;charset=utf-8" });
    var application_yml = new Blob(['server:\n',
      '  port: ${PORT:8761}\n',
      'eureka:\n',
      '  client:\n',
      '    registerWithEureka: false\n',
      '    fetchRegistry: false\n',
      '    serviceUrl:\n',
      '      defaultZone: http://localhost:8761/eureka/\n',
      '  instance:\n',
      '    preferIpAddress: true'], { type: "text/plain;charset=utf-8" });
    var eurekaApplication_java = new Blob(['package es.ual.acg.discovery;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;\n', '@SpringBootApplication\n@EnableEurekaServer\npublic class EurekaApplication {public static void main(String[] args) {SpringApplication.run(EurekaApplication.class, args);}}'], { type: "text/plain;charset=utf-8" });
    return { discovery_mvn, application_yml, eurekaApplication_java }
  }
  private buildGateway() {
    var gateway_mvn = new Blob(['<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>gateway</artifactId><version>0.0.1-SNAPSHOT</version><name>Gateway</name><description>Gateway service</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-starter-gateway</artifactId></dependency><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-starter-netflix-eureka-client</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope><exclusions><exclusion><groupId>org.junit.vintage</groupId><artifactId>junit-vintage-engine</artifactId></exclusion></exclusions></dependency></dependencies><dependencyManagement><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-dependencies</artifactId><version>${spring-cloud.version}</version><type>pom</type><scope>import</scope></dependency></dependencies></dependencyManagement><build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build><repositories><repository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></repository><repository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></repository></repositories><pluginRepositories><pluginRepository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></pluginRepository><pluginRepository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></pluginRepository></pluginRepositories></project>'], { type: "text/plain;charset=utf-8" });
    var application_yml = new Blob(['spring:\n',
      '  application:\n',
      '    name: discovery-service\n',
      '  cloud:\n',
      '    gateway:\n',
      '      discovery:\n',
      '        locator:\n',
      '          enabled: true\n',
      '          lower-case-service-id: true\n',
      'eureka:\n',
      '  client:\n',
      '    eureka-server-connect-timeout-seconds: 5\n',
      '    enabled: true\n',
      '    fetch-registry: true\n',
      '    register-with-eureka: false\n',
      '    serviceUrl:\n',
      '      defaultZone: http://localhost:8761/eureka/\n',
      '  server:\n',
      '    port: 80\n',
      '  management:\n',
      '    endpoint:\n',
      '      gateway:\n',
      '        enabled: true\n'], { type: "text/plain;charset=utf-8" });
    var corsFilter_java = new Blob(['package es.ual.acg.gateway;import org.springframework.context.annotation.Bean;import org.springframework.context.annotation.Configuration;import org.springframework.http.HttpHeaders;import org.springframework.web.cors.CorsConfiguration;import org.springframework.web.cors.reactive.CorsWebFilter;import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;import org.springframework.web.reactive.config.CorsRegistry;import org.springframework.web.reactive.config.EnableWebFlux;import org.springframework.web.reactive.config.WebFluxConfigurer;\n@Configuration\n@EnableWebFlux\npublic class CORSFilter implements WebFluxConfigurer {   \n@Override\npublic void addCorsMappings(CorsRegistry registry) {registry.addMapping("/**").allowCredentials(true).allowedOrigins("*").allowedHeaders("*").allowedMethods("*");}@Bean\n public CorsWebFilter corsWebFilter(){CorsConfiguration corsConfiguration = new CorsConfiguration();corsConfiguration.setAllowCredentials(true);corsConfiguration.addAllowedHeader("*");corsConfiguration.addAllowedMethod("*");corsConfiguration.addAllowedOrigin("*");UrlBasedCorsConfigurationSource corsConfigurationSource = new UrlBasedCorsConfigurationSource();corsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);return new CorsWebFilter(corsConfigurationSource);   }}'], { type: "text/plain;charset=utf-8" });
    var gatewayApplication_java = new Blob(['package es.ual.acg.gateway;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;\n@SpringBootApplication\n@EnableDiscoveryClient\npublic class GatewayApplication {public static void main(String[] args) {SpringApplication.run(GatewayApplication.class, args);}}'], { type: "text/plain;charset=utf-8" });

    return { gateway_mvn, application_yml, corsFilter_java, gatewayApplication_java };
  }
  // TODO ** add the libraries of WoTnectivity
  private buildController() {
    var controllermvn_tmp = '<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>' + this.parsedTd.title + '-controller</artifactId> <version>0.0.1-SNAPSHOT</version> <name>' + this.parsedTd.title + '-controller</name><description>' + this.parsedTd.title + '-controller</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-webflux</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-openfeign</artifactId> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId> </dependency> <dependency> <groupId>es.ual.acg</groupId> <artifactId>wotnectivity</artifactId> <version>0.0.1-ALPHA-SNAPSHOT</version> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> <exclusions> <exclusion> <groupId>org.junit.vintage</groupId> <artifactId>junit-vintage-engine</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>io.projectreactor</groupId> <artifactId>reactor-test</artifactId> <scope>test</scope> </dependency> </dependencies> <dependencyManagement> <dependencies> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-dependencies</artifactId> <version>${spring-cloud.version}</version> <type>pom</type> <scope>import</scope> </dependency> </dependencies> </dependencyManagement> <build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build> <repositories> <repository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </pluginRepository> </pluginRepositories>';
    var controller_mvn = new Blob([controllermvn_tmp], { type: "text/plain;charset=utf-8" });
    var mainApplication_java = new Blob(['package es.ual.acg.' + this.parsedTd.title + 'controller;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;import org.springframework.cloud.openfeign.EnableFeignClients;\n@SpringBootApplication\n@EnableDiscoveryClient\n @EnableFeignClients\n public class ' + this.capitalizeFirstLetter(this.parsedTd.title) + 'ControllerApplication {\n public static void main(String[] args) {\n SpringApplication.run(' + this.capitalizeFirstLetter(this.parsedTd.title) + 'ControllerApplication.class, args);\n }\n}'], { type: "text/plain;charset=utf-8" });
    var propertyData_tmp = "\\todo"
    var propertyData_java = new Blob([propertyData_tmp], { type: "text/plain;charset=utf-8" })
    var controller_tmp = "\\todo"
    var controller_java = new Blob([controller_tmp], { type: "text/plain;charset=utf-8" })
    var iDataHandler_tmp = "\\todo"
    var iDataHandler_java =  new Blob([iDataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var application_properties = new Blob(["spring.application.name = dimmer1-controller\nserver.port = 0\neureka.client.serviceUrl.defaultZone = http://localhost:8761/eureka"],{ type: "text/plain;charset=utf-8" })
    return { controller_mvn, mainApplication_java, propertyData_java, controller_java, iDataHandler_java, application_properties};
  }

  // TODO ** add the libraries of WoTnectivity
  private buildUi() {
    var uimvn_tmp = '<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>' + this.parsedTd.title + '-ui</artifactId> <version>0.0.1-SNAPSHOT</version> <name>' + this.parsedTd.title + '-ui</name><description>' + this.parsedTd.title + '-ui</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-webflux</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-openfeign</artifactId> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId> </dependency> <dependency> <groupId>es.ual.acg</groupId> <artifactId>wotnectivity</artifactId> <version>0.0.1-ALPHA-SNAPSHOT</version> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> <exclusions> <exclusion> <groupId>org.junit.vintage</groupId> <artifactId>junit-vintage-engine</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>io.projectreactor</groupId> <artifactId>reactor-test</artifactId> <scope>test</scope> </dependency> </dependencies> <dependencyManagement> <dependencies> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-dependencies</artifactId> <version>${spring-cloud.version}</version> <type>pom</type> <scope>import</scope> </dependency> </dependencies> </dependencyManagement> <build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build> <repositories> <repository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </pluginRepository> </pluginRepositories>';
    var ui_mvn = new Blob([uimvn_tmp], { type: "text/plain;charset=utf-8" });
    var mainApplication_java = new Blob(['package es.ual.acg.' + this.parsedTd.title + 'ui;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;import org.springframework.cloud.openfeign.EnableFeignClients;\n@SpringBootApplication\n@EnableDiscoveryClient\n @EnableFeignClients\n public class ' + this.capitalizeFirstLetter(this.parsedTd.title) + 'UiApplication {\n public static void main(String[] args) {\n SpringApplication.run(' + this.capitalizeFirstLetter(this.parsedTd.title) + 'UiApplication.class, args);\n }\n}'], { type: "text/plain;charset=utf-8" });
    var propertyData_tmp = "\\todo"
    var propertyData_java = new Blob([propertyData_tmp], { type: "text/plain;charset=utf-8" })
    var ui_tmp = "\\todo"
    var ui_java = new Blob([ui_tmp], { type: "text/plain;charset=utf-8" })
    var iDataHandler_tmp = "\\todo"
    var iDataHandler_java =  new Blob([iDataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var application_properties = new Blob(["spring.application.name = dimmer1-ui\nserver.port = 0\neureka.client.serviceUrl.defaultZone = http://localhost:8761/eureka"],{ type: "text/plain;charset=utf-8" })
    return { ui_mvn, mainApplication_java, propertyData_java, ui_java, iDataHandler_java, application_properties};
  }

  // TODO ** add the libraries of WoTnectivity
  private buildDataHandler() {
    var dataHandlermvn_tmp = '<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>' + this.parsedTd.title + '-dataHandler</artifactId> <version>0.0.1-SNAPSHOT</version> <name>' + this.parsedTd.title + '-dataHandler</name><description>' + this.parsedTd.title + '-dataHandler</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-webflux</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-openfeign</artifactId> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId> </dependency> <dependency> <groupId>es.ual.acg</groupId> <artifactId>wotnectivity</artifactId> <version>0.0.1-ALPHA-SNAPSHOT</version> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> <exclusions> <exclusion> <groupId>org.junit.vintage</groupId> <artifactId>junit-vintage-engine</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>io.projectreactor</groupId> <artifactId>reactor-test</artifactId> <scope>test</scope> </dependency> </dependencies> <dependencyManagement> <dependencies> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-dependencies</artifactId> <version>${spring-cloud.version}</version> <type>pom</type> <scope>import</scope> </dependency> </dependencies> </dependencyManagement> <build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build> <repositories> <repository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </pluginRepository> </pluginRepositories>';
    var dataHandler_mvn = new Blob([dataHandlermvn_tmp], { type: "text/plain;charset=utf-8" });
    var mainApplication_java = new Blob(['package es.ual.acg.' + this.parsedTd.title + 'dataHandler;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;import org.springframework.cloud.openfeign.EnableFeignClients;\n@SpringBootApplication\n@EnableDiscoveryClient\n @EnableFeignClients\n public class ' + this.capitalizeFirstLetter(this.parsedTd.title) + 'DataHandlerApplication {\n public static void main(String[] args) {\n SpringApplication.run(' + this.capitalizeFirstLetter(this.parsedTd.title) + 'DataHandlerApplication.class, args);\n }\n}'], { type: "text/plain;charset=utf-8" });
    var propertyData_tmp = "\\todo"
    var propertyData_java = new Blob([propertyData_tmp], { type: "text/plain;charset=utf-8" })
    var dataHandler_tmp = "\\todo"
    var dataHandler_java = new Blob([dataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var iDataHandler_tmp = "\\todo"
    var iDataHandler_java =  new Blob([iDataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var application_properties = new Blob(["spring.application.name = dimmer1-dataHandler\nserver.port = 0\neureka.client.serviceUrl.defaultZone = http://localhost:8761/eureka"],{ type: "text/plain;charset=utf-8" })
    return { dataHandler_mvn, mainApplication_java, propertyData_java, dataHandler_java, iDataHandler_java, application_properties};
  }

  // TODO ** add the libraries of WoTnectivity
  private buildReflection() {
    var reflectionmvn_tmp = '<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>' + this.parsedTd.title + '-reflection</artifactId> <version>0.0.1-SNAPSHOT</version> <name>' + this.parsedTd.title + '-reflection</name><description>' + this.parsedTd.title + '-reflection</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-webflux</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-openfeign</artifactId> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId> </dependency> <dependency> <groupId>es.ual.acg</groupId> <artifactId>wotnectivity</artifactId> <version>0.0.1-ALPHA-SNAPSHOT</version> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> <exclusions> <exclusion> <groupId>org.junit.vintage</groupId> <artifactId>junit-vintage-engine</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>io.projectreactor</groupId> <artifactId>reactor-test</artifactId> <scope>test</scope> </dependency> </dependencies> <dependencyManagement> <dependencies> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-dependencies</artifactId> <version>${spring-cloud.version}</version> <type>pom</type> <scope>import</scope> </dependency> </dependencies> </dependencyManagement> <build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build> <repositories> <repository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </pluginRepository> </pluginRepositories>';
    var reflection_mvn = new Blob([reflectionmvn_tmp], { type: "text/plain;charset=utf-8" });
    var mainApplication_java = new Blob(['package es.ual.acg.' + this.parsedTd.title + 'reflection;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;import org.springframework.cloud.openfeign.EnableFeignClients;\n@SpringBootApplication\n@EnableDiscoveryClient\n @EnableFeignClients\n public class ' + this.capitalizeFirstLetter(this.parsedTd.title) + 'ReflectionApplication {\n public static void main(String[] args) {\n SpringApplication.run(' + this.capitalizeFirstLetter(this.parsedTd.title) + 'ReflectionApplication.class, args);\n }\n}'], { type: "text/plain;charset=utf-8" });
    var propertyData_tmp = "\\todo"
    var propertyData_java = new Blob([propertyData_tmp], { type: "text/plain;charset=utf-8" })
    var reflection_tmp = "\\todo"
    var reflection_java = new Blob([reflection_tmp], { type: "text/plain;charset=utf-8" })
    var iDataHandler_tmp = "\\todo"
    var iDataHandler_java =  new Blob([iDataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var application_properties = new Blob(["spring.application.name = dimmer1-reflection\nserver.port = 0\neureka.client.serviceUrl.defaultZone = http://localhost:8761/eureka"],{ type: "text/plain;charset=utf-8" })
    return { reflection_mvn, mainApplication_java, propertyData_java, reflection_java, iDataHandler_java, application_properties};
  }
  // TODO ** add the libraries of WoTnectivity
  private buildEventHandler() {
    var eventHandlermvn_tmp = '<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>' + this.parsedTd.title + '-eventHandler</artifactId> <version>0.0.1-SNAPSHOT</version> <name>' + this.parsedTd.title + '-eventHandler</name><description>' + this.parsedTd.title + '-eventHandler</description><properties><java.version>11</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-webflux</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId> </dependency> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-starter-openfeign</artifactId> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-data-mongodb-reactive</artifactId> </dependency> <dependency> <groupId>es.ual.acg</groupId> <artifactId>wotnectivity</artifactId> <version>0.0.1-ALPHA-SNAPSHOT</version> </dependency> <dependency> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-starter-test</artifactId> <scope>test</scope> <exclusions> <exclusion> <groupId>org.junit.vintage</groupId> <artifactId>junit-vintage-engine</artifactId> </exclusion> </exclusions> </dependency> <dependency> <groupId>io.projectreactor</groupId> <artifactId>reactor-test</artifactId> <scope>test</scope> </dependency> </dependencies> <dependencyManagement> <dependencies> <dependency> <groupId>org.springframework.cloud</groupId> <artifactId>spring-cloud-dependencies</artifactId> <version>${spring-cloud.version}</version> <type>pom</type> <scope>import</scope> </dependency> </dependencies> </dependencyManagement> <build> <plugins> <plugin> <groupId>org.springframework.boot</groupId> <artifactId>spring-boot-maven-plugin</artifactId> </plugin> </plugins> </build> <repositories> <repository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </repository> </repositories> <pluginRepositories> <pluginRepository> <id>spring-milestones</id> <name>Spring Milestones</name> <url>https://repo.spring.io/milestone</url> </pluginRepository> </pluginRepositories>';
    var eventHandler_mvn = new Blob([eventHandlermvn_tmp], { type: "text/plain;charset=utf-8" });
    var mainApplication_java = new Blob(['package es.ual.acg.' + this.parsedTd.title + 'eventHandler;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.client.discovery.EnableDiscoveryClient;import org.springframework.cloud.openfeign.EnableFeignClients;\n@SpringBootApplication\n@EnableDiscoveryClient\n @EnableFeignClients\n public class ' + this.capitalizeFirstLetter(this.parsedTd.title) + 'EventHandlerApplication {\n public static void main(String[] args) {\n SpringApplication.run(' + this.capitalizeFirstLetter(this.parsedTd.title) + 'EventHandlerApplication.class, args);\n }\n}'], { type: "text/plain;charset=utf-8" });
    var propertyData_tmp = "\\todo"
    var propertyData_java = new Blob([propertyData_tmp], { type: "text/plain;charset=utf-8" })
    var eventHandler_tmp = "\\todo"
    var eventHandler_java = new Blob([eventHandler_tmp], { type: "text/plain;charset=utf-8" })
    var iDataHandler_tmp = "\\todo"
    var iDataHandler_java =  new Blob([iDataHandler_tmp], { type: "text/plain;charset=utf-8" })
    var application_properties = new Blob(["spring.application.name = dimmer1-eventHandler\nserver.port = 0\neureka.client.serviceUrl.defaultZone = http://localhost:8761/eureka"],{ type: "text/plain;charset=utf-8" })
    return { eventHandler_mvn, mainApplication_java, propertyData_java, eventHandler_java, iDataHandler_java, application_properties};
  }


  servicesNeeded(td) {
    this.parsedTd = JSON.parse(td);
    var services = { services: ["infrastructure", "controller"] };
    if (this.parsedTd.properties || this.parsedTd.events) {
      services.services.push("reflection");
    }
    if (this.parsedTd.events) {
      services.services.push("eventHandler");
    }
    if (this.parsedTd["@type"] && this.parsedTd["@type"].includes("ui")) {
      services.services.push("ui");
    }
    if (this.parsedTd["@type"] && this.parsedTd["@type"].includes("virtual")) {
      services.services.push("virtualizer");
    }
    if (this.parsedTd.actions || this.parsedTd.properties) {
      services.services.push("dataHandler");
    }
    this.librariesNeed();
    return services;
  }
  librariesNeed(){
    
    this.wotnectivityReq.push("http");
    if(this.parsedTd.actions || this.parsedTd.properties || this.parsedTd.events){
      if(this.parsedTd.actions){
        
        for (let [key, value] of Object.entries(this.parsedTd.actions)){
          if(this.parsedTd.actions[key].forms[0].subprotocol && (this.parsedTd.actions[key].forms[0].subprotocol == 'ws' || this.parsedTd.actions[key].forms[0].subprotocol == 'wss')) {
            if(!this.wotnectivityReq.includes("ws")) this.wotnectivityReq.push("ws");
          };
        }
      }
      if(this.parsedTd.properties){
        
        for (let [key, value] of Object.entries(this.parsedTd.properties)){
          if(this.parsedTd.properties[key].forms[0].subprotocol && (this.parsedTd.properties[key].forms[0].subprotocol == 'ws' || this.parsedTd.properties[key].forms[0].subprotocol == 'wss')) {
            if(!this.wotnectivityReq.includes("ws")) this.wotnectivityReq.push("ws");
          };
        }
      }
      if(this.parsedTd.events){
        
        for (let [key, value] of Object.entries(this.parsedTd.events)){
          if(this.parsedTd.events[key].forms[0].subprotocol && (this.parsedTd.events[key].forms[0].subprotocol == 'ws' || this.parsedTd.events[key].forms[0].subprotocol == 'wss')) {
            if(!this.wotnectivityReq.includes("ws")) this.wotnectivityReq.push("ws");
          };
        }
      }
    }
  }

  zipController() {
    var controller = this.buildController();
    var zip = new JSZip();
    zip.file("pom.xml", controller.controller_mvn);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"controller/"+this.capitalizeFirstLetter(this.parsedTd.title)+"ControllerApplication.java", controller.mainApplication_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"controller/Controller.java", controller.controller_java);  
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"controller/models/PropertyData.java", controller.propertyData_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"controller/feign/IDataHandler.java", controller.iDataHandler_java);
    zip.file("src/main/resources/application.properties", controller.propertyData_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "controller.zip");
      });
  }
  // TODO
  zipUi() {
    var ui = this.buildUi();
    var zip = new JSZip();
    zip.file("pom.xml", ui.ui_mvn);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"ui/"+this.capitalizeFirstLetter(this.parsedTd.title)+"ControllerApplication.java", ui.mainApplication_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"ui/Ui.java", ui.ui_java);  
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"ui/models/PropertyData.java", ui.propertyData_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"ui/feign/IDataHandler.java", ui.iDataHandler_java);
    zip.file("src/main/resources/application.properties", ui.propertyData_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "ui.zip");
      });
  }
  zipEventHandler() {
    var eventHandler = this.buildEventHandler();
    var zip = new JSZip();
    zip.file("pom.xml", eventHandler.eventHandler_mvn);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"eventHandler/"+this.capitalizeFirstLetter(this.parsedTd.title)+"EventHandlerApplication.java", eventHandler.mainApplication_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"eventHandler/EventHandler.java", eventHandler.eventHandler_java);  
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"eventHandler/models/PropertyData.java", eventHandler.propertyData_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"eventHandler/feign/IDataHandler.java", eventHandler.iDataHandler_java);
    zip.file("src/main/resources/application.properties", eventHandler.propertyData_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "eventHandler.zip");
      });
  }
  zipDataHandler() {
    var dataHandler = this.buildDataHandler();
    var zip = new JSZip();
    zip.file("pom.xml", dataHandler.dataHandler_mvn);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"dataHandler/"+this.capitalizeFirstLetter(this.parsedTd.title)+"DataHandlerApplication.java", dataHandler.mainApplication_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"dataHandler/DataHandler.java", dataHandler.dataHandler_java);  
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"dataHandler/models/PropertyData.java", dataHandler.propertyData_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"dataHandler/feign/IDataHandler.java", dataHandler.iDataHandler_java);
    zip.file("src/main/resources/application.properties", dataHandler.propertyData_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "dataHandler.zip");
      });
  }
  zipReflection() {
    var reflection = this.buildReflection();
    var zip = new JSZip();
    zip.file("pom.xml", reflection.reflection_mvn);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"reflection/"+this.capitalizeFirstLetter(this.parsedTd.title)+"ReflectionApplication.java", reflection.mainApplication_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"reflection/Reflection.java", reflection.reflection_java);  
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"reflection/models/PropertyData.java", reflection.propertyData_java);
    zip.file("src/main/java/es/ual/acg/"+this.parsedTd.title+"reflection/feign/IDataHandler.java", reflection.iDataHandler_java);
    zip.file("src/main/resources/application.properties", reflection.propertyData_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "reflection.zip");
      });
  }
  zipInfrastructure() {
    var dockerc = this.ddInfraBuilderService.buildCommon();
    var discovery = this.buildDiscovery();
    var gateway = this.buildGateway();
    var zip = new JSZip();
    zip.file("docker-compose.yml", dockerc);
    zip.file("discovery/pom.xml", discovery.discovery_mvn);
    zip.file("discovery/src/main/resources/application.yml", discovery.application_yml);
    zip.file("discovery/src/main/java/es/ual/acg/discovery/EurekaApplication.java", discovery.eurekaApplication_java);
    zip.file("gateway/pom.xml", gateway.gateway_mvn);
    zip.file("gateway/src/main/resources/application.yml", gateway.application_yml);
    zip.file("gateway/src/main/java/es/ual/acg/gateway/GatewayApplication.java", gateway.gatewayApplication_java);
    zip.file("gateway/src/main/java/es/ual/acg/gateway/CORSFilter.java", gateway.corsFilter_java);
    zip.generateAsync({ type: "blob" })
      .then(function (blob) {
        FileSaver.saveAs(blob, "infrastructure.zip");
      });
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
}
