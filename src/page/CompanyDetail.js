import * as React from 'react';
import { alpha } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import AppNavbar from '../dashboard/components/AppNavbar';
import Header from '../dashboard/components/Header';
import SideMenu from '../dashboard/components/SideMenu';
import AppTheme from '../shared-theme/AppTheme';
import { useParams, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Button, CardMedia, Typography } from '@mui/material';
import axios from 'axios';
import RelatedCompany from '../company/components/RelatedCompany';
import BlogRecruitButtons from '../company/BlogRecruitButtons';
import MetaTag from '../shared/components/MetaTag';
import { companyTypes, stacks } from '../commons/data/RecruitOptions';

export default function CompanyDetail(props) {
  const [data, setData] = React.useState({})

  const { companyName: encodedName } = useParams();
  const companyName = decodeURIComponent(encodedName || '');

  React.useEffect(() => {
    const params = {
      fields: "id,name,region,industry,size,establishment,representation,revenue,address,employee_count,homepage_url,logo_url,description,blog_count,recruit_count",
      name: companyName
    }

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company/companies/single`, { params })
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }, [companyName])

  return (
    <>
      <Box sx={{ display: 'flex', mt: 3 }}>
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: 'auto',
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: 'center',
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={4}
              sx={{
                width: '100%',
                maxWidth: '900px',
                mx: 'auto',
                px: 2,
                alignItems: 'stretch', // 세로 정렬 기준 맞춤
              }}
            >
              <Box
                sx={{
                  position: 'relative',
                  width: 399,
                  height: 399,
                  borderRadius: 2,
                  overflow: 'hidden',
                  boxShadow: 3,
                  mx: 'auto',
                }}
              >
                <CardMedia
                  component="img"
                  alt="company"
                  image={data.logo_url || "/favicon.ico"}
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,        // 이미지 아래쪽에서 조금 위에 위치 (간격 조절 가능)
                    left: 16,
                    color: '#fff',     // 텍스트 색은 흰색, 필요에 따라 변경
                    backgroundColor: 'rgba(0, 0, 0, 0.2)', // 반투명 검은 배경으로 텍스트 돋보이게
                    padding: '8px 12px',
                    borderRadius: 1,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                  }}
                >
                  {data.recruit_count ? (
                    <Typography variant="body2" color='#4169e1'>
                      채용 중
                    </Typography>) :
                    (
                      <Typography variant="body2" color='#b71c1c'>
                        채용 마감
                      </Typography>
                    )
                  }
                </Box>
              </Box>
              <Box
                sx={{
                  height: { xs: 'auto', md: 399 },
                  borderRadius: 2,
                  boxShadow: 3,
                  backdropFilter: 'blur(80px)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  border: theme => `1px solid ${theme.palette.divider}`,
                  p: 3,
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  gap: 2,
                }}
              >
                {[
                  { label: '지역', value: data.region },
                  { label: '산업', value: data.industry },
                  { label: '규모', value: data.size },
                  { label: '직원 수', value: data.employee_count },
                  { label: '홈페이지', value: data.homepage_url },
                ].map((item) => (
                  <Box
                    key={item.label}
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-start',
                      alignItems: 'baseline',
                    }}
                  >
                    <Box
                      sx={{
                        minWidth: '100px',
                        fontWeight: 500,
                        color: 'text.secondary',
                        fontSize: '1.1rem',
                      }}
                    >
                      {item.label}
                    </Box>
                    <Typography
                      variant="body1"
                      sx={{ color: 'text.primary', fontWeight: 400 }}
                    >
                      {item.value || '-'}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Stack>
            <BlogRecruitButtons
              name={data.name}
              blog_count={data.blog_count}
              recruit_count={data.recruit_count}
            />
            {data.id && <RelatedCompany companyId={data.id} />}
          </Stack>
        </Box>
      </Box>
      <MetaTag
        title={`${companyName} 기업 정보 - AllDevHub`}
        description={companyTypes}
        keywords={companyTypes}
        image="https://alldevhub.com/assets/preview.png"
        url="https://alldevhub.com"
      />
    </>
  );
}