package com.example.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();
        
        // Permitir credenciales
        config.setAllowCredentials(true);
        
        // Permitir solicitudes desde el frontend local y el desplegado
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedOrigin("https://app106.proyectos.fireploy.online");
        
        // Permitir todos los headers
        config.addAllowedHeader("*");
        
        // Permitir todos los métodos (GET, POST, etc.)
        config.addAllowedMethod("*");
        
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}