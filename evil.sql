-- MariaDB dump 10.19  Distrib 10.6.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: prueba
-- ------------------------------------------------------
-- Server version	10.6.11-MariaDB-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Characters`
--

DROP TABLE IF EXISTS `Characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Characters` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Name` varchar(30) NOT NULL,
  `Surname` varchar(30) NOT NULL,
  `Gender` char(1) NOT NULL,
  `Profile` varchar(30) NOT NULL,
  `Created` timestamp NOT NULL DEFAULT current_timestamp(),
  `Updated` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Status` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Characters`
--

LOCK TABLES `Characters` WRITE;
/*!40000 ALTER TABLE `Characters` DISABLE KEYS */;
INSERT INTO `Characters` VALUES (1,'Leon','Kennedy','h','Police','2022-11-15 14:33:21','2022-11-15 17:12:42','N'),(2,'Helna','Harper','F','Agente','2022-11-15 14:36:58','2022-11-15 16:56:01','N'),(3,'Shery','Birkin','m','Agente','2022-11-16 21:32:10','2022-11-16 17:35:24','N');
/*!40000 ALTER TABLE `Characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Usuarios`
--

DROP TABLE IF EXISTS `Usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Usuarios` (
  `ID` int(10) NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Edad` int(3) NOT NULL,
  `Genero` char(1) DEFAULT NULL,
  `Usuario` varchar(255) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Fecha_Nacimiento` date DEFAULT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Actualizado` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `Active` char(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Usuarios`
--

LOCK TABLES `Usuarios` WRITE;
/*!40000 ALTER TABLE `Usuarios` DISABLE KEYS */;
INSERT INTO `Usuarios` VALUES (8,'William','Contreras Garcias',40,'h','william@gmail.com','$2a$10$xCM1yWGiQNzTsSkTY4UPS.RkdJkJ2Ie28oN1XD8v1J5mIo5fxPVei','1935-06-07','2022-10-27 21:40:13','2022-10-27 18:17:10','S'),(9,'Misael','Villar Julian',21,'m','misa@gmail.com','$2a$10$OkRbyeXwRarkX5jO12insuzcE7RW6Y8x2nK2dBfDYEH34AeX84vQK','2001-01-07','2022-10-27 23:23:49','2022-10-31 17:13:55','M');
/*!40000 ALTER TABLE `Usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-19 11:35:33
