FROM openjdk:17-alpine
COPY build/libs/ecommerce-java-0.0.1-SNAPSHOT.jar ./build.jar
RUN apk add fontconfig ttf-dejavu
ENTRYPOINT ["java", "-jar", "/build.jar"]