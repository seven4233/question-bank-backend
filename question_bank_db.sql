/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80037 (8.0.37)
 Source Host           : localhost:3306
 Source Schema         : question_bank_db

 Target Server Type    : MySQL
 Target Server Version : 80037 (8.0.37)
 File Encoding         : 65001

 Date: 15/06/2024 23:24:05
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for answers
-- ----------------------------
DROP TABLE IF EXISTS `answers`;
CREATE TABLE `answers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `answer_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of answers
-- ----------------------------

-- ----------------------------
-- Table structure for bank
-- ----------------------------
DROP TABLE IF EXISTS `bank`;
CREATE TABLE `bank`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `fever` int NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of bank
-- ----------------------------
INSERT INTO `bank` VALUES (1, '2023', '南网培训班安规题库', 0, '2024-06-14 21:54:39.063264');

-- ----------------------------
-- Table structure for multiple_choice_options
-- ----------------------------
DROP TABLE IF EXISTS `multiple_choice_options`;
CREATE TABLE `multiple_choice_options`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `question_id` int NOT NULL,
  `option_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `isCorrect` tinyint NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of multiple_choice_options
-- ----------------------------
INSERT INTO `multiple_choice_options` VALUES (1, 1, '选择锤头应完整，其表面应光滑微凸', 0, '2024-06-14 21:45:39.355158', '2024-06-14 21:49:57.252663', 'A');
INSERT INTO `multiple_choice_options` VALUES (2, 1, '锤把上不可有油污', 0, '2024-06-14 21:45:45.479068', '2024-06-14 21:49:58.259079', 'B');
INSERT INTO `multiple_choice_options` VALUES (3, 1, '使用锤把较长时间手易磨出水泡，可以佩戴手套减少摩擦', 1, '2024-06-14 21:45:48.807245', '2024-06-14 21:49:59.457102', 'C');
INSERT INTO `multiple_choice_options` VALUES (4, 1, '作业时周围不准有人靠近', 0, '2024-06-14 21:45:51.708587', '2024-06-14 21:50:00.502283', 'D');
INSERT INTO `multiple_choice_options` VALUES (5, 2, '清理现场', 1, '2024-06-14 21:50:49.767572', '2024-06-14 21:51:51.808647', 'A');
INSERT INTO `multiple_choice_options` VALUES (6, 2, '测定可燃气体含量', 0, '2024-06-14 21:50:55.994167', '2024-06-14 21:51:31.217985', 'B');
INSERT INTO `multiple_choice_options` VALUES (7, 2, '绝缘隔离', 0, '2024-06-14 21:50:59.866401', '2024-06-14 21:51:35.689404', 'C');
INSERT INTO `multiple_choice_options` VALUES (8, 2, '设置警示栏', 0, '2024-06-14 21:51:05.001541', '2024-06-14 21:51:38.717197', 'D');

-- ----------------------------
-- Table structure for question_bank
-- ----------------------------
DROP TABLE IF EXISTS `question_bank`;
CREATE TABLE `question_bank`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `difficulty` int NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `bank_id` int NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of question_bank
-- ----------------------------
INSERT INTO `question_bank` VALUES (1, '依据南网安规，大锤和手锤使用时的错误行为选项是（     ）。', '单选题', 0, '2024-06-14 21:37:03.450227', '2024-06-14 21:37:03.450227', 0);
INSERT INTO `question_bank` VALUES (2, '依据南网安规，动火作业间断或终结后，应（     ），确认无残留火种后，方可离开。', '单选题', 0, '2024-06-14 21:37:28.151695', '2024-06-14 21:37:28.151695', 0);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `account` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `gender` tinyint NULL DEFAULT 0,
  `questionDoneCount` int NOT NULL DEFAULT 0,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/file/avatar.jpg',
  `phone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `sign` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `realName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `access` tinyint NOT NULL DEFAULT 0,
  `createdAt` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'admin', 'admin', '', 1, 0, 'https://hualin-1314589919.cos.ap-beijing.myqcloud.com/%C3%A8%C2%80%C2%81%C3%A7%C2%85%C2%A7%C3%A7%C2%89%C2%87.jpg', NULL, NULL, '', NULL, '', NULL, 0, '2024-06-15 12:49:03.235023');

SET FOREIGN_KEY_CHECKS = 1;
