import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function BlogRecruitButtons( { name, blog_count, recruit_count }) {
  const navigate = useNavigate()

  const goRecruitPage = () => {
    navigate(`/${encodeURIComponent(name)}/recruits`)
  }

  const goBlogPage = () => {
    navigate(`/${encodeURIComponent(name)}/blogs`)
  }

  return (
    <Stack direction={{ xs: 'column', md: 'row' }}
      spacing={4}
      sx={{
        width: '100%',
        maxWidth: '900px',
        mx: 'auto',
        px: 2,
        alignItems: 'stretch', // 세로 정렬 기준 맞춤
      }}>
      <Box
        sx={{
          position: 'relative',
          width: 399,
          mx: 'auto',
        }}
      >
        <Button
          variant="contained"
          color="primary"
          onClick={goRecruitPage}
          sx={{
            flex: 1,
            py: 1.5,
            fontWeight: 'bold',
            fontSize: '1rem',
            borderRadius: 2,
            boxShadow: 2,
            width: '100%'
          }}
        >
          채용 공고 보러가기 ({recruit_count ?? 0})
        </Button>
      </Box>
      <Button
        variant="outlined"
        color="primary"
        onClick={goBlogPage}
        sx={{
          flex: 1,
          py: 1.5,
          fontWeight: 'bold',
          fontSize: '1rem',
          borderRadius: 2,
          boxShadow: 1,
          borderWidth: 2,
        }}
      >
        블로그 보러가기 ({blog_count ?? 0})
      </Button>
    </Stack>
  )
}