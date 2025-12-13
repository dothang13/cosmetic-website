-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: localhost    Database: cosmetic_store
-- ------------------------------------------------------
-- Server version	8.0.41

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`,`product_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (2,2,1,'2025-12-13 04:52:00','2025-12-13 04:52:00');
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Trang điểm'),(2,'Chăm sóc da mặt'),(3,'Chăm sóc tóc'),(4,'Nước hoa'),(5,'Chăm sóc da body'),(6,'Dụng cụ làm đẹp');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  `num` int DEFAULT NULL,
  `total_money` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (1,1,NULL,320000,2,640000),(2,1,NULL,490000,2,980000),(3,1,NULL,1200000,1,1200000),(4,1,NULL,120000,1,120000),(5,1,NULL,350000,3,1050000),(6,2,NULL,950000,2,1900000),(7,2,NULL,3000000,3,9000000),(8,2,NULL,350000,5,1750000),(9,3,NULL,120000,1,120000);
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `fullname` varchar(100) DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `note` varchar(1000) DEFAULT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` enum('pending','processing','shipped','delivered','cancelled') DEFAULT 'pending',
  `total_money` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,2,'customer','customer@gmail.com','0363092603','45 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng','Giao hoả tốc','2025-12-13 10:59:35','pending',4020000),(2,2,'customer','customer@gmail.com','0363092603','45 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng','hehehe','2025-12-13 11:27:34','pending',12680000),(3,2,'customer','customer@gmail.com','0363092603','45 Nguyễn Lương Bằng, Liên Chiểu, Đà Nẵng','Giao 12h đêm','2025-12-13 11:27:54','pending',150000);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `title` varchar(250) NOT NULL,
  `price` int NOT NULL,
  `discount` int DEFAULT '0',
  `thumbnail` varchar(500) DEFAULT NULL,
  `description` longtext,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `deleted` tinyint DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,1,'3CE Velvet Lip Tint',320000,0,'/img/makeup/3CE Velvet Lip Tint.webp','Son kem lì, chất mềm mượt, màu bám lâu 6–8h, phù hợp phong cách trẻ trung.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(2,1,'Bbia Last Velvet Lip Tint',150000,0,'/img/makeup/Bbia Last Velvet Lip Tint.webp','Chất son nhẹ môi, bảng màu đa dạng, không gây khô môi.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(3,1,'MAC Matte Lipstick',490000,0,'/img/makeup/MAC Matte Lipstick.webp','Son thỏi lì cao cấp, màu sắc nổi bật, độ bám tốt, không lem.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(4,1,'Maybelline Fit Me Foundation',250000,0,'/img/makeup/3CE Velvet Lip Tint.webp','Che phủ tốt, kiềm dầu, thích hợp da dầu và hỗn hợp.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(5,1,'Estee Lauder Double Wear',1200000,0,'/img/makeup/Estee Lauder Double Wear.jpg','Foundation lâu trôi 12–18h, che phủ cao, phù hợp trang điểm chuyên nghiệp.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(6,1,'L’Oreal True Match',300000,0,'/img/makeup/L’Oreal True Match.jpg','Nền tự nhiên, mỏng nhẹ, dễ tán, không gây bí da.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(7,1,'Innisfree No Sebum Mineral Powder',120000,0,'/img/makeup/Innisfree No Sebum Mineral Powder.jpg','Dạng bột kiềm dầu tốt, cho lớp nền khô thoáng.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(8,1,'Maybelline Fit Me Loose Powder',250000,0,'/img/makeup/Maybelline Fit Me Foundation.webp','Che phủ nhẹ, làm mịn bề mặt da.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(9,1,'MAC Studio Fix Powder',950000,0,'/img/makeup/MAC Studio Fix Powder.jpg','Phấn phủ cao cấp, độ che phủ tốt, kiểm soát dầu cả ngày.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(10,1,'Maybelline Hyper Curl',120000,0,'/img/makeup/Maybelline Hyper Curl.jpg','Làm cong và dày mi, chống lem.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(11,1,'L’Oreal Lash Paradise',250000,0,'/img/makeup/L’Oreal Lash Paradise.jpeg','Tăng độ dài và dày, giữ cả ngày.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(12,1,'Dior Diorshow Mascara',950000,0,'/img/makeup/Dior Diorshow Mascara.webp','Mascara cao cấp, làm dày mi tự nhiên, không vón cục.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(13,1,'3CE Mood Recipe Blush',280000,0,'/img/makeup/3CE Mood Recipe Blush.webp','Màu tự nhiên, dễ tán.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(14,1,'Clinique Cheek Pop',65000,0,'/img/makeup/Clinique Cheek Pop.jpg','Mịn, lâu trôi, màu trong trẻo.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(15,1,'Nars Blush – Orgasm',900000,0,'/img/makeup/Nars Blush – Orgasm.webp','Màu nổi tiếng, ánh nhũ nhẹ.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(16,1,'3CE Multi Eye Color Palette',700000,0,'/img/makeup/3CE Multi Eye Color Palette.jpg','9 màu dễ dùng, chất lì và shimmer.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(17,1,'Etude House Play Color Eyes',350000,0,'/img/makeup/Etude House Play Color Eyes.jpeg','Nhiều tone, pigment tốt.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(18,1,'Huda Beauty Rose Gold Palette',1300000,0,'/img/makeup/Huda Beauty Rose Gold Palette.webp','Bảng mắt cao cấp, màu đẹp, bám lâu.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(19,1,'Focallure Contour Kit',320000,0,'/img/makeup/Focallure Contour Kit.jpg','Bộ khối gồm highlight & contour, dễ tán, tạo khối mặt tự nhiên.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(20,1,'Judydoll Highlight & Contour Waves',950000,0,'/img/makeup/Judydoll Highlight & Contour Waves.jpg','Phấn nền kiêm phấn phủ, dùng để highlight hoặc phủ nhẹ, finish lì.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(21,1,'NYX Wonder Stick',280000,0,'/img/makeup/NYX Wonder Stick.jpg','Cây khối 2 đầu: highlight & contour, tiện lợi, pigment tốt.','2025-11-28 15:49:25','2025-11-28 23:03:39',0),(22,2,'CeraVe Foaming Cleanser',350000,0,'/img/skincare/CeraVe Foaming Cleanser.jpg','Dịu nhẹ, giữ độ ẩm, da dầu dùng tốt.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(23,2,'Senka Perfect Whip',120000,0,'/img/skincare/Senka Perfect Whip.jpg','Tạo bọt dày, làm sạch sâu.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(24,2,'La Roche-Posay Effaclar Gel',320000,0,'/img/skincare/La Roche-Posay Effaclar Gel.webp','Làm sạch, giảm dầu và mụn.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(25,2,'Thayers Witch Hazel',250000,0,'/img/skincare/Thayers Witch Hazel.webp','Se lỗ chân lông, dịu da.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(26,2,'Hada Labo Gokujyun Lotion',230000,0,'/img/skincare/Hada Labo Gokujyun Lotion.jpg','Cấp ẩm mạnh.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(27,2,'Kiehl’s Calendula Toner',650000,0,'/img/skincare/Kiehl’s Calendula Toner.jpg','Làm dịu, cấp ẩm, không cồn.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(28,2,'The Ordinary Niacinamide 10%',280000,0,'/img/skincare/The Ordinary Niacinamide.jpg','Giảm thâm, kiềm dầu, se lỗ chân lông.','2025-11-28 15:49:25','2025-11-28 23:04:54',0),(29,2,'Vichy Mineral 89',750000,0,'/img/skincare/Vichy Mineral 89.jpg','Dưỡng ẩm, phục hồi da.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(30,2,'Skin1004 Madagascar Centella',300000,0,'/img/skincare/Skin1004 Madagascar Centella.jpg','Làm dịu da, tốt cho da mụn.','2025-11-28 15:49:25','2025-11-28 23:01:06',0),(31,3,'Tsubaki Premium Shampoo',250000,0,'/img/haircare/Tsubaki Premium Shampoo.jpg','Dưỡng tóc mềm, bóng khỏe.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(32,3,'Tresemmé Keratin Smooth',200000,0,'/img/haircare/Tresemmé Keratin Smooth.jpg','Giảm xơ rối, suôn mượt.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(33,3,'Head & Shoulders',150000,0,'/img/haircare/Head & Shoulders.jpg','Trị gàu hiệu quả.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(34,3,'Tsubaki Conditioner',250000,0,'/img/haircare/Tsubaki Conditioner.jpg','Phục hồi tóc, mềm mượt.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(35,3,'Dove Nourishing Conditioner',120000,0,'/img/haircare/Dove Nourishing Conditioner.jpg','Làm mượt, dễ chải.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(36,3,'Tresemmé Conditioner',200000,0,'/img/haircare/Tresemmé Conditioner.jpg','Dưỡng tóc, giảm xơ.','2025-11-28 15:49:25','2025-11-28 23:07:38',0),(37,4,'Dior J’adore',3000000,0,'/img/perfume/Dior J’adore.webp','Hương hoa sang trọng, ngọt nhẹ.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(38,4,'Gucci Bloom',2900000,0,'/img/perfume/Gucci Bloom.webp','Hương hoa tươi mới.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(39,4,'YSL Libre',3200000,0,'/img/perfume/YSL Libre.webp','Hương quyến rũ, sang trọng.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(40,4,'Dior Sauvage',3000000,0,'/img/perfume/Dior Sauvage.webp','Hương nam tính, mạnh mẽ.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(41,4,'Chanel Bleu de Chanel',3200000,0,'/img/perfume/Chanel Bleu de Chanel.jpg','Hương gỗ sang trọng.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(42,4,'Versace Dylan Blue',2200000,0,'/img/perfume/Versace Dylan Blue.jpg','Hương biển và gỗ nam tính.','2025-11-28 15:49:25','2025-11-28 23:10:02',0),(43,5,'Dove Deeply Nourishing',120000,0,'/img/body_care/Dove Deeply Nourishing.webp','Làm mềm da, dưỡng ẩm.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(44,5,'Love Beauty & Planet',170000,0,'/img/body_care/Love Beauty & Planet.jpg','Mùi thơm tự nhiên, dịu nhẹ.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(45,5,'Bath & Body Works Shower Gel',250000,0,'/img/body_care/Bath & Body Works Shower Gel.webp','Hương thơm lâu, nhiều mùi.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(46,5,'Vaseline Healthy White',140000,0,'/img/body_care/Vaseline Healthy White.jpg','Dưỡng sáng và ẩm.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(47,5,'Nivea Extra White',120000,0,'/img/body_care/Nivea Extra White.jpg','Làm mềm da, dễ thấm.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(48,5,'Bath & Body Works Lotion',300000,0,'/img/body_care/Bath & Body Works Lotion.jpg','Thơm lâu, dưỡng ẩm tốt.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(49,6,'Foreo Luna Mini 2',2000000,0,'/img/beauty_tools/Foreo Luna Mini 2.jpg','Sóng âm T-sonic, làm sạch sâu.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(50,6,'Xiaomi InFace Cleanser',350000,0,'/img/beauty_tools/Xiaomi InFace Cleanser.webp','Giá rẻ, hiệu quả ổn.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(51,6,'Halio Facial Cleansing Device',700000,0,'/img/beauty_tools/Halio Facial Cleansing Device.jpg','Làm sạch tốt, phù hợp mọi loại da','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(52,6,'Silcot Soft',38000,0,'/img/beauty_tools/Silcot Soft.jpg','Mềm, thấm nước tốt.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(53,6,'Ipek Cotton Pads',60000,0,'/img/beauty_tools/Ipek Cotton Pads.jpg','Bông dai, không xù.','2025-11-28 15:49:25','2025-11-28 23:14:27',0),(54,6,'Miniso Cotton Pads',350000,0,'/img/beauty_tools/Miniso Cotton Pads.jpg','Bông rẻ, dễ dùng.','2025-11-28 15:49:25','2025-12-13 11:17:14',1);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int DEFAULT '2',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `is_active` tinyint DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@gmail.com','0123456789','54 nguyen luong bang, lien chieu, da nang','admin',1,'2025-12-10 13:44:44','2025-12-10 13:44:44',1),(2,'customer','customer@gmail.com','9876543210','194 nguyen luong bang, lien chieu, da nang','customer',2,'2025-12-10 13:55:26','2025-12-10 13:55:26',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cosmetic_store'
--

--
-- Dumping routines for database 'cosmetic_store'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-13 11:59:12
