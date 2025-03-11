package com.example.filter;

import com.example.config.ActionToApiMapping;
import io.micrometer.core.instrument.MeterRegistry;
import io.micrometer.core.instrument.Counter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class ActionRedirectFilter extends OncePerRequestFilter {

    private static final Logger logger = LoggerFactory.getLogger(ActionRedirectFilter.class);

    private final Counter springBootRequestCounter;
    private final Counter strutsRequestCounter;

    public ActionRedirectFilter(MeterRegistry meterRegistry) {
        this.springBootRequestCounter = meterRegistry.counter("custom.action.requests", "type", "spring");
        this.strutsRequestCounter = meterRegistry.counter("custom.action.requests", "type", "struts");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        String contextPath = request.getContextPath();

        logger.info("Incoming request: {}, Context Path: {}", requestURI, contextPath);

        if (requestURI.endsWith(".action")) {
            String actionPath = requestURI.substring(contextPath.length());
            String newPath = ActionToApiMapping.getApiEndpoint(actionPath);

            if (newPath != null) {
                String apiRedirectPath = contextPath + "/api" + newPath;
                logger.info("Redirecting '{}' to '{}'", requestURI, apiRedirectPath);
                springBootRequestCounter.increment();
                request.getRequestDispatcher(apiRedirectPath).forward(request, response);
                return;
            }

            logger.warn("No mapping found for '{}'. Passing to Struts for handling.", requestURI);
            strutsRequestCounter.increment();
        }

        filterChain.doFilter(request, response);
    }
}
