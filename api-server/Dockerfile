FROM openjdk:14-alpine
COPY build/libs/management-*-all.jar management.jar
EXPOSE 8080
CMD ["java", "-Dcom.sun.management.jmxremote", "-Xmx128m", "-jar", "management.jar"]