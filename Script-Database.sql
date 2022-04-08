SET NAMES utf8mb4;

-- SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for Cap Danh Muc
-- ----------------------------
DROP TABLE IF EXISTS `big_category`;
CREATE TABLE `big_category` (
  `BigCatID` int unsigned NOT NULL AUTO_INCREMENT,
  `BigCatName` nvarchar(50) COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`BigCatID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for Danh Muc
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `CatID` int unsigned NOT NULL AUTO_INCREMENT,
  `CatName` nvarchar(50) COLLATE utf8_general_ci NOT NULL,
  `BigCat` int unsigned NOT NULL, 
  PRIMARY KEY (`CatID`),
  FOREIGN KEY (`BigCat`) REFERENCES big_category(`BigCatID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `Username` varchar(50) COLLATE utf8_general_ci NOT NULL,
  `Password` varchar(255) COLLATE utf8_general_ci NOT NULL,
  `Address` nvarchar(80) COLLATE utf8_general_ci NOT NULL,
  `Number` varchar(11) COLLATE utf8_general_ci NOT NULL,
  `Type` char(1) NOT NULL,
  PRIMARY KEY (`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Table structure for products
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `ProID` int unsigned NOT NULL AUTO_INCREMENT,
  `CatID` int unsigned NOT NULL,
  `ProName` nvarchar(200) COLLATE utf8_general_ci NOT NULL,
  `Price` int unsigned NOT NULL,
  `LinkURL` char(200) NOT NULL,
  `Stock` int unsigned NOT NULL,
  `ProState` bit NOT NULL, 
  `Description` text COLLATE utf8_general_ci NOT NULL,
  
  PRIMARY KEY (`ProID`),
  FOREIGN KEY (`CatID`) REFERENCES category(`CatID`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Gio hang
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `User` char(50) COLLATE utf8_general_ci NOT NULL,
  `ProID` int unsigned NOT NULL,
  `Stock` int NOT NULL,
  PRIMARY KEY (`ProID`,`User`),
  FOREIGN KEY (`ProID`) REFERENCES product(`ProID`),
  FOREIGN KEY (`User`) REFERENCES user(`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Don dat hang
-- pending 1, 2 approved, 3  shipping, 4 success, 5 canceled
-- ----------------------------
DROP TABLE IF EXISTS `order_list`;
CREATE TABLE `order_list` (
  `OrderID` int unsigned NOT NULL AUTO_INCREMENT,
  `User` char(50) COLLATE utf8_general_ci NOT NULL,
  `Date` datetime NOT NULL,
  `State` int unsigned NOT NULL, 
  PRIMARY KEY (`OrderID`),
  FOREIGN KEY (`User`) REFERENCES user(`Username`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- ----------------------------
-- Chi tiet don dat hang
-- ----------------------------
DROP TABLE IF EXISTS `order_detail`;
CREATE TABLE `order_detail` (
  `OrderID` int unsigned NOT NULL,
  `ProID` int unsigned NOT NULL,
  `Stock` int unsigned NOT NULL,
  PRIMARY KEY (`OrderID`,`ProID`),
  FOREIGN KEY (`OrderID`) REFERENCES order_list(`OrderID`),
  FOREIGN KEY (`ProID`) REFERENCES product(`ProID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- Insert Data

-- ----------------------------
-- Records of Danh Muc
-- ----------------------------
BEGIN;
INSERT INTO `big_category` VALUES (1, 'RAM');
INSERT INTO `big_category` VALUES (2, 'SSD');
INSERT INTO `big_category` VALUES (3, 'CPU');
COMMIT;

-- ----------------------------
-- Records of Danh Muc
-- ----------------------------
BEGIN;
INSERT INTO `category` VALUES (1, 'Hynix',1);
INSERT INTO `category` VALUES (2, 'Crucial',1);
INSERT INTO `category` VALUES (3, 'Samsung',2);
INSERT INTO `category` VALUES (4, 'Intel',2);
INSERT INTO `category` VALUES (5, 'Intel',3);
INSERT INTO `category` VALUES (6, 'AMD',3);
COMMIT;

-- User (1) - Admin (2)
-- ----------------------------
-- Records of User
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('thanh','$2a$10$Aq.r.RZmDExi19OZkzKqW.7BrhuVHL8nYWVh7vtHCiS/MeM55wIOG','154 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM','0933442607','1');
INSERT INTO `user` VALUES ('an','$2a$10$Aq.r.RZmDExi19OZkzKqW.7BrhuVHL8nYWVh7vtHCiS/MeM55wIOG','155 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM','0933442606','1');
INSERT INTO `user` VALUES ('ngan','$2a$10$Aq.r.RZmDExi19OZkzKqW.7BrhuVHL8nYWVh7vtHCiS/MeM55wIOG','156 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM','0933442605','1');
COMMIT;

-- ----------------------------
-- Records of Admin
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('admin1','$2a$10$Aq.r.RZmDExi19OZkzKqW.7BrhuVHL8nYWVh7vtHCiS/MeM55wIOG','150 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM','0933442601','2');
INSERT INTO `user` VALUES ('admin2','$2a$10$Aq.r.RZmDExi19OZkzKqW.7BrhuVHL8nYWVh7vtHCiS/MeM55wIOG','150 Nguyễn Chí Thanh, Phường 9, Quận 5, TP.HCM','0933442602','2');
COMMIT;


-- ----------------------------
-- Records of Product
-- ----------------------------
BEGIN;

-- Ring
INSERT INTO `product` VALUES (1,1,'Ram Laptop DDR3L Hynix 4GB Bus 1600 SODIMM PC3L-12800',400000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (2,1,'RAM Laptop DDR5 Hynix 32GB Bus 4800 HMCG88MEBSA092N',7200000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (3,1,'RAM PC DDR5 Hynix 8GB Bus 4800 HMCG66MEBUA081N',1880000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (4,1,'RAM PC DDR5 Crucial 16GB Bus 4800 CT16G48C40U5',3850000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (5,1,'RAM PC DDR5 Hynix 16GB Bus 4800 HMCG78MEBUA081N',3800000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

INSERT INTO `product` VALUES (6,2,'RAM PC DDR5 Crucial 32GB Bus 4800 CT32G48C40U5',7200000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (7,2,'RAM PC DDR5 Crucial 16GB Bus 4800 CT16G48C40U5',3850000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (8,2,'RAM PC DDR5 Crucial 8GB Bus 4800 CT8G48C40U5',1880000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

INSERT INTO `product` VALUES (9,3,'SSD Samsung PM881 128GB M2 2280 SATA',580000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (10,3,'SSD Samsung PM981A 1TB M2 2280 PCIe NVMe',2800000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (11,3,'SSD Samsung PM981A 256GB M2 2280 PCIe NVMe',900000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (12,3,'SSD Samsung PM991 1TB M2 2242 PCIe NVMe',4650000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

INSERT INTO `product` VALUES (13,4,'SSD Enterprise Intel DC S4500 240GB SSDSC2KB240G701',1750000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (14,4,'SSD Enterprise Intel DC S4500 480GB SSDSC2KB480G701',2850000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

INSERT INTO `product` VALUES (15,5,'CPU Intel Core i5-10400F',3599000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (16,5,'CPU Intel Core i7-12700F',8999000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (17,5,'CPU Intel Core i9-11900F',11199000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (18,5,'CPU Intel Core i7-12700',9399000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

INSERT INTO `product` VALUES (19,6,'CPU AMD Ryzen 5 3600 (3.6GHz turbo up to 4.2GHz, 6 nhân 12 luồng, 35MB Cache, 65W) - Socket AMD AM4',5399000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (20,6,'CPU AMD Ryzen 5 3500 (3.6GHz turbo up to 4.1GHz, 6 nhân 6 luồng, 16MB Cache, 65W) - Socket AMD AM4',3839000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');
INSERT INTO `product` VALUES (21,6,'CPU AMD Ryzen 5 5600X (3.7 GHz Upto 4.6GHz / 35MB / 6 Cores, 12 Threads / 65W / Socket AM4)',6699000,'https://i.imgur.com/N8ee3Qh.jpg',100,1,'Test description');

COMMIT;

BEGIN;
INSERT INTO `cart` VALUES ('thanh',1,2);
INSERT INTO `cart` VALUES ('thanh',16,1);
INSERT INTO `cart` VALUES ('an',15,3);
INSERT INTO `cart` VALUES ('ngan',16,4);
COMMIT;

BEGIN;
INSERT INTO `order_list` VALUES (1,'thanh','2021-11-11 11:12:01',1);
INSERT INTO `order_list` VALUES (2,'thanh','2021-12-11 11:12:01',2);
INSERT INTO `order_list` VALUES (3,'thanh','2022-01-11 11:12:01',4);
INSERT INTO `order_list` VALUES (4,'thanh','2021-12-11 11:12:01',4);
INSERT INTO `order_list` VALUES (5,'an','2021-11-11 11:12:01',4);
INSERT INTO `order_list` VALUES (6,'an','2021-12-11 11:12:01',3);
INSERT INTO `order_list` VALUES (7,'an','2022-01-11 11:12:01',4);
INSERT INTO `order_list` VALUES (8,'an','2021-02-11 11:12:01',4);
INSERT INTO `order_list` VALUES (9,'an','2021-03-11 11:12:01',4);
INSERT INTO `order_list` VALUES (10,'an','2020-12-11 11:12:01',4);
INSERT INTO `order_list` VALUES (11,'an','2021-11-11 11:12:01',4);
INSERT INTO `order_list` VALUES (12,'an','2021-12-11 11:12:01',4);
INSERT INTO `order_list` VALUES (13,'an','2021-01-11 11:12:01',4);
INSERT INTO `order_list` VALUES (14,'ngan','2022-02-11 11:12:01',4);
INSERT INTO `order_list` VALUES (15,'ngan','2022-03-11 11:12:01',4);
COMMIT;

BEGIN;
INSERT INTO `order_detail` VALUES (1,1,1);
INSERT INTO `order_detail` VALUES (1,8,1);
INSERT INTO `order_detail` VALUES (2,5,2);
INSERT INTO `order_detail` VALUES (2,8,2);
INSERT INTO `order_detail` VALUES (3,4,1);
INSERT INTO `order_detail` VALUES (3,2,2);

INSERT INTO `order_detail` VALUES (4,3,1);
INSERT INTO `order_detail` VALUES (4,4,1);
INSERT INTO `order_detail` VALUES (5,3,1);
INSERT INTO `order_detail` VALUES (6,9,2);
INSERT INTO `order_detail` VALUES (7,11,1);

INSERT INTO `order_detail` VALUES (7,9,2);
INSERT INTO `order_detail` VALUES (7,14,1);
INSERT INTO `order_detail` VALUES (8,14,1);
INSERT INTO `order_detail` VALUES (9,14,1);
INSERT INTO `order_detail` VALUES (9,12,1);
INSERT INTO `order_detail` VALUES (10,10,1);
INSERT INTO `order_detail` VALUES (10,11,1);
INSERT INTO `order_detail` VALUES (11,10,1);

INSERT INTO `order_detail` VALUES (11,1,1);
INSERT INTO `order_detail` VALUES (11,15,1);
INSERT INTO `order_detail` VALUES (12,17,2);
INSERT INTO `order_detail` VALUES (12,18,1);
INSERT INTO `order_detail` VALUES (13,15,2);
INSERT INTO `order_detail` VALUES (13,20,2);
INSERT INTO `order_detail` VALUES (14,16,3);
INSERT INTO `order_detail` VALUES (15,15,1);
COMMIT;


-- ----------------------------
-- Records of order
-- ----------------------------

-- Full text search

ALTER TABLE `product`
ADD FULLTEXT(ProName);