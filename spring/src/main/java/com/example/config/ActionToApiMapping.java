package com.example.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.HashMap;
import java.util.Map;

public class ActionToApiMapping {

    private static final Logger logger = LoggerFactory.getLogger(ActionToApiMapping.class);
    private static final Map<String, String> ACTION_TO_API_MAP = new HashMap<>();

    static {
        ACTION_TO_API_MAP.put("/angular/login.action", "/login");
        ACTION_TO_API_MAP.put("/user/signup.action", "/signup");
        ACTION_TO_API_MAP.put("/order/checkout.action", "/checkout");

        logger.info("Loaded {} action mappings", ACTION_TO_API_MAP.size());
    }

    public static String getApiEndpoint(String actionPath) {
        String mappedEndpoint = ACTION_TO_API_MAP.get(actionPath);
        if (mappedEndpoint == null) {
            logger.warn("No API mapping found for '{}'", actionPath);
        } else {
            logger.info("Mapping found: '{}' → '{}'", actionPath, mappedEndpoint);
        }
        return mappedEndpoint;
    }
}
