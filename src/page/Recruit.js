import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { categories } from '../commons/data/RecruitOptions';
import RecruitMain from '../dashboard/components/RecruitMain';

import MetaTag from '../shared/components/MetaTag';


export default function Recruit(props) {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
            mt:2
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 7, md: 8 },

            }}
          >
            <RecruitMain />
          </Stack>
        </Box>
      </Box>
      <MetaTag
        title='개발자 채용 공고 - AllDevHub'
        description="AllDevHub에서는 다양한 기업의 기술 스택과 채용 공고를 비교할 수 있습니다."
        keywords={categories}
        image="https://alldevhub.com/assets/preview.png"
        url="https://alldevhub.com"
      />
    </>
  );
}
