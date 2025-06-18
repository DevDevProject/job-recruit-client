// SettingPopUp.jsx
import React from 'react'; // useState는 더 이상 필요 없음
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button'; // Typography는 이미 @mui/material에서 가져오고 있으므로 제거
import Typography from '@mui/material/Typography';
import ColorModeIconDropdown from '../../shared-theme/ColorModeIconDropdown';
import { Box, FormControlLabel, Switch, useColorScheme } from '@mui/material';


// ★★★ props로 open과 onClose를 받습니다. ★★★
export default function SettingPopUp({ open, onClose }) {

	const { mode, setMode } = useColorScheme();

	const handleToggleDarkMode = (event) => {
		setMode(event.target.checked ? 'dark' : 'light');
	};

	return (
		<Dialog
			open={open}
			onClose={onClose}
			sx={{
				'& .MuiDialog-paper': {
					minWidth: { xs: '90%', md: 400 },
				},
			}}
		>
			<DialogTitle>설정</DialogTitle>
			<DialogContent dividers>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						my: 2,
					}}
				>
					<Typography>
						다크 모드
					</Typography>
					<FormControlLabel
						control={
							<Switch
								checked={mode === 'dark'} // 현재 모드가 'dark'면 true
								onChange={handleToggleDarkMode} // 변경 핸들러
								name="darkModeToggle"
								color="primary"
							/>
						}
						label={mode === 'dark' ? 'ON' : 'OFF'} // 현재 모드에 따라 'ON'/'OFF' 표시
						labelPlacement="start" // 라벨을 스위치 왼쪽에 배치 (선택 사항)
						sx={{ ml: 0 }} // 기본 좌측 마진 제거 (옵션)
					/>
				</Box>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose}>닫기</Button> {/* 닫기 버튼도 props로 받은 onClose 사용 */}
			</DialogActions>
		</Dialog>
	);
}