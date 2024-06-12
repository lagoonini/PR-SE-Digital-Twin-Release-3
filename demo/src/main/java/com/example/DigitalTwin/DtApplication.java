package com.example.DigitalTwin;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DtApplication {

	public static void main(String[] args) {
		SpringApplication.run(DtApplication.class, args);
	}

}

