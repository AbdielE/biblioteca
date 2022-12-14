-- MariaDB dump 10.19  Distrib 10.11.1-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: biblioteca
-- ------------------------------------------------------
-- Server version	10.11.1-MariaDB

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
-- Table structure for table `lectores`
--

DROP TABLE IF EXISTS `lectores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lectores` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Usuario` varchar(255) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellidos` varchar(255) NOT NULL,
  `Domicilio` varchar(255) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  `Contrasena` varchar(255) NOT NULL,
  `Activo` char(1) NOT NULL,
  `Creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `Modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lectores`
--

LOCK TABLES `lectores` WRITE;
/*!40000 ALTER TABLE `lectores` DISABLE KEYS */;
INSERT INTO `lectores` VALUES
(1,'abdiel','Abdiel E.','Alfonso Ch.','calle v','2871456848','$2a$10$VUExTGF8G3mhswj.9NOSGuvqfSG7sXkz0K5cGIOjVB9LwnCFIKuYq','S','2022-12-12 16:20:51','2022-12-12 16:29:00'),
(2,'abdiel esteban','Abdiel Esteban 2','Alfonso Chávez 2','calle colonia 2','2871461674','$2a$10$DSzZmin3/Ta0D0aNnyP/pueRAlJcf3nG60wIdRNn5qBmdSeHdEAni','S','2022-12-13 16:10:29','2022-12-13 16:10:29');
/*!40000 ALTER TABLE `lectores` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `libros`
--

DROP TABLE IF EXISTS `libros`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `libros` (
  `ISBN` varchar(13) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `autor` varchar(255) NOT NULL,
  `editorial` varchar(255) NOT NULL,
  `volumen` int(2) DEFAULT NULL,
  `edicion` varchar(20) DEFAULT NULL,
  `genero` varchar(25) NOT NULL,
  `lugarPub` varchar(20) NOT NULL,
  `fechaPub` varchar(10) NOT NULL,
  `estado` varchar(15) NOT NULL,
  PRIMARY KEY (`ISBN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `libros`
--

LOCK TABLES `libros` WRITE;
/*!40000 ALTER TABLE `libros` DISABLE KEYS */;
INSERT INTO `libros` VALUES
('123','Libro','persona','casa editora',20,'si','fantasia','mexico','2000-01-01','Activo'),
('12345673234','Libro 2','persona 2','casa editora 2',2,'si','fantasia','mexico','2000-01-01','Activo'),
('1234567891234','Libro 3','persona','casa editora',20,'si','fantasia','mexico','2000-01-01','Activo');
/*!40000 ALTER TABLE `libros` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prestamo`
--

DROP TABLE IF EXISTS `prestamo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `prestamo` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `ISBNlibro` varchar(13) NOT NULL,
  `IDlector` int(11) NOT NULL,
  `fcPrest` timestamp NOT NULL DEFAULT current_timestamp(),
  `fcEntrega` date NOT NULL,
  `estado` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ISBNlibro` (`ISBNlibro`),
  KEY `IDlector` (`IDlector`),
  CONSTRAINT `prestamo_ibfk_1` FOREIGN KEY (`ISBNlibro`) REFERENCES `libros` (`ISBN`),
  CONSTRAINT `prestamo_ibfk_2` FOREIGN KEY (`IDlector`) REFERENCES `lectores` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prestamo`
--

LOCK TABLES `prestamo` WRITE;
/*!40000 ALTER TABLE `prestamo` DISABLE KEYS */;
INSERT INTO `prestamo` VALUES
(1,'123',2,'2022-12-13 17:26:15','2000-09-20','Devuelto'),
(11,'1234567891234',1,'2022-12-14 04:52:17','2000-09-20','Devuelto'),
(12,'1234567891234',1,'2022-12-14 05:15:57','2000-09-20','Devuelto'),
(13,'1234567891234',1,'2022-12-14 05:43:52','2000-09-20','Devuelto'),
(14,'1234567891234',1,'2022-12-14 05:49:06','2000-09-20','Devuelto');
/*!40000 ALTER TABLE `prestamo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-14  0:07:00
