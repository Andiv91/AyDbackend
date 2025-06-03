package com.example.backend.controller;

import com.example.backend.dto.CodeExecutionRequest;
import com.example.backend.dto.CodeExecutionResponse;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/python")
public class CodeExecutionController {

    @PostMapping("/execute")
    public CodeExecutionResponse executePythonCode(@RequestBody CodeExecutionRequest request) {
        String pistonUrl = "https://emkc.org/api/v2/piston/execute";
        RestTemplate restTemplate = new RestTemplate();

        Map<String, Object> body = new HashMap<>();
        body.put("language", request.getLanguage());
        body.put("version", request.getVersion());
        body.put("files", List.of(Map.of("content", request.getCode())));

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(
                    pistonUrl,
                    HttpMethod.POST,
                    entity,
                    Map.class);

            System.out.println("Piston response: " + response.getBody());

            String output = "";
            if (response.getBody() != null && response.getBody().get("run") != null) {
                Map run = (Map) response.getBody().get("run");
                if (run.get("output") != null) {
                    output = run.get("output").toString();
                }
            }
            return new CodeExecutionResponse(output);
        } catch (Exception e) {
            e.printStackTrace();
            return new CodeExecutionResponse("Error: " + e.getMessage());
        }
    }
}