package tn.maisonnael.config;

import com.fasterxml.jackson.core.StreamReadConstraints;
import org.springframework.boot.autoconfigure.jackson.Jackson2ObjectMapperBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/** Tight JSON parsing limits: protects against oversized strings and deeply nested payloads. */
@Configuration
public class JacksonConfig {
    @Bean
    Jackson2ObjectMapperBuilderCustomizer jsonLimits() {
        return b -> b.postConfigurer(om -> om.getFactory().setStreamReadConstraints(
            StreamReadConstraints.builder().maxStringLength(10_000).maxNestingDepth(10).maxNumberLength(20).build()));
    }
}
