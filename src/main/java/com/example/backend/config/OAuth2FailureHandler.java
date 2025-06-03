package com.example.backend.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2FailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                        AuthenticationException exception) throws IOException, ServletException {
        
        // Obtener el mensaje de error
        String errorMessage = exception.getMessage();
        
        // Si el error es nulo o vacío, usar un mensaje genérico
        if (errorMessage == null || errorMessage.isEmpty()) {
            errorMessage = "Error durante la autenticación con Google";
        }
        // Si el error es por rol incorrecto, mostrar el mensaje amigable
        if (errorMessage.contains("No puedes iniciar sesión como")) {
            errorMessage = errorMessage; // Ya es amigable, pero aquí podrías personalizarlo si quieres
        }
        
        // Codificar el mensaje para que sea seguro en URL
        String encodedMessage = URLEncoder.encode(errorMessage, StandardCharsets.UTF_8.toString());
        
        System.out.println("Autenticación OAuth2 fallida: " + errorMessage);
        
        // Redirigir al frontend con el mensaje de error
        response.sendRedirect("http://localhost:3000/login?error=" + encodedMessage);
    }
} 