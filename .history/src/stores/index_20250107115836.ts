// 使用 nanostores 进行状态管理
import { atom } from 'nanostores';

export const isLoadingGame = atom<boolean>(false);
export const isGameStarted = atom<boolean>(false); 