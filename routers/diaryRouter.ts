import { Router } from 'express';
import diaryController from '../controller/diaryController';
import { authenticateToken } from "../middlewares/authmiddleware";
const diaryRouter = Router();

//calendar diary 전체 조회
diaryRouter.get('/month', authenticateToken, diaryController.getAllDiariesByMonth);
//calendar diary 등록
diaryRouter.post('/', authenticateToken, diaryController.createDiary);
//calendar diary 조회
diaryRouter.get('/:date', authenticateToken, diaryController.getDiary);
//calendar diary 수정
diaryRouter.patch('/:date', authenticateToken, diaryController.updateDiary);
//calendar diary 삭제
diaryRouter.delete('/:date', authenticateToken, diaryController.deleteDiary);

export default diaryRouter;