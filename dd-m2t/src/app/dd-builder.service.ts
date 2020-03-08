import { Injectable } from '@angular/core';
import { DdInfraBuilderService } from './dd-infra-builder.service';
import { platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

var FileSaver = require('file-saver');
var JSZip = require("jszip");

@Injectable({
  providedIn: 'root',
})
export class DdBuilderService {

  constructor(private ddInfraBuilderService: DdInfraBuilderService) { }

  buildDiscovery(){

    var discovery_mvn = new Blob(['<?xml version="1.0" encoding="UTF-8"?><project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd"><modelVersion>4.0.0</modelVersion><parent><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-parent</artifactId><version>2.2.0.BUILD-SNAPSHOT</version><relativePath/> <!-- lookup parent from repository --></parent><groupId>es.ual.acg</groupId><artifactId>discovery</artifactId><version>0.0.1-SNAPSHOT</version><name>Discovery Server</name><description>Discovery service</description><properties><java.version>1.8</java.version><spring-cloud.version>Hoxton.BUILD-SNAPSHOT</spring-cloud.version></properties><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-starter-netflix-eureka-server</artifactId></dependency><dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-test</artifactId><scope>test</scope><exclusions><exclusion><groupId>org.junit.vintage</groupId><artifactId>junit-vintage-engine</artifactId></exclusion></exclusions></dependency></dependencies><dependencyManagement><dependencies><dependency><groupId>org.springframework.cloud</groupId><artifactId>spring-cloud-dependencies</artifactId><version>${spring-cloud.version}</version><type>pom</type><scope>import</scope></dependency></dependencies></dependencyManagement><build><plugins><plugin><groupId>org.springframework.boot</groupId><artifactId>spring-boot-maven-plugin</artifactId></plugin></plugins></build><repositories><repository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></repository><repository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></repository></repositories><pluginRepositories><pluginRepository><id>spring-milestones</id><name>Spring Milestones</name><url>https://repo.spring.io/milestone</url></pluginRepository><pluginRepository><id>spring-snapshots</id><name>Spring Snapshots</name><url>https://repo.spring.io/snapshot</url><snapshots><enabled>true</enabled></snapshots></pluginRepository></pluginRepositories></project>'], {type: "text/plain;charset=utf-8"});
    var application_yml= new Blob(['server:\n',
                                  '  port: ${PORT:8761}\n',
                                  'eureka:\n',
                                  '  client:\n',
                                  '    registerWithEureka: false\n',
                                  '    fetchRegistry: false\n',
                                  '    serviceUrl:\n',
                                  '      defaultZone: http://localhost:8761/eureka/\n',
                                  '  instance:\n',
                                  '    preferIpAddress: true'], {type: "text/plain;charset=utf-8"});
    var eurekaApplication_java= new Blob(['package es.ual.acg.discovery;import org.springframework.boot.SpringApplication;import org.springframework.boot.autoconfigure.SpringBootApplication;import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;\n','@SpringBootApplication\n@EnableEurekaServer\npublic class EurekaApplication {public static void main(String[] args) {SpringApplication.run(EurekaApplication.class, args);}}'],{type: "text/plain;charset=utf-8"});
    return {discovery_mvn, application_yml, eurekaApplication_java}
  }
  servicesNeeded(td){
    var parsedTd = JSON.parse(td);
    var services = {services:["infrastructure", "controller"]};
    if(parsedTd.properties || parsedTd.events) services.services.push("reflection");
    if(parsedTd.events) services.services.push("eventHandler");
    if(parsedTd["@type"] && parsedTd["@type"].includes("ui")) services.services.push("ui");
    if(parsedTd["@type"] && parsedTd["@type"].includes("virtual")) services.services.push("virtualizer");
    if(parsedTd.actions || parsedTd.properties) services.services.push("dataHandler");

    return services;
  }

  zipInfrastructure(){
    var dockerc = this.ddInfraBuilderService.buildCommon();
    var discovery = this.buildDiscovery();
    var zip = new JSZip();
    zip.file("docker-compose.yml",dockerc);
    zip.file("/discovery/pom.xml", discovery.discovery_mvn)
    zip.file("/discovery/src/main/resources/application.yml", discovery.application_yml);
    zip.file("/discovery/src/main/java/es/ual/acg/discovery/EurekaApplication.java", discovery.eurekaApplication_java);
    zip.generateAsync({type:"blob"})
    .then(function (blob) {
        FileSaver.saveAs(blob, "infrastructure.zip");
    });
  }
}
