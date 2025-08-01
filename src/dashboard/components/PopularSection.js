import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Tooltip } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PopularSection = () => {
  const theme = useTheme();


  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [recruits, setRecruits] = useState([])
  const [companies, setCompanies] = useState([])
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/recruit/popular`)
      .then(res => {
        setRecruits(res.data)
      }).catch(err => console.log('recruit ' + err))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/blog/popular`)
      .then(res => {
        setBlogs(res.data)
      }).catch(err => console.log('blog ' + err))

    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company/popular`)
      .then(res => {
        setCompanies(res.data)
      }).catch(err => console.log('company ' + err))
  }, [])



  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      justifyContent="center"
      width="100%"
      gap={2}
      mt={4}
    >
      <PopularCard title="인기 채용 공고" data={recruits} category="recruit" />
      <PopularCard title="인기 블로그 글" data={blogs} category="blog" />
      <PopularCard title="인기 기업 순위" data={companies} category="company" />
    </Box>
  );
};

const PopularCard = ({ title, data, category }) => {
  const navigate = useNavigate()

  return (
    <Card sx={{
      flex: 1,
      flexShrink: 0,
      minHeight: 420,
      minWidth: 300,
      maxWidth: 450,

    }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">{title}</Typography>
          <Button size="small" onClick={() => navigate(`/${category}`)}>더보기</Button>
        </Box>
        <Table size="small">
          <TableBody>
            {data.slice(0, 10).map((item, index) => (
              <TableRow
                key={item.id}
                hover
                sx={{ cursor: 'pointer' }}
                onClick={() => navigate(`/${category}/${item.id}`)}
              >
                <TableCell align="center" sx={{ whiteSpace: 'nowrap', }}>{index + 1}</TableCell>
                {(category === 'recruit' || category === 'blog') ? (
                  <TableCell>
                    <Tooltip title={item.title}>
                      <Box
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "220px",
                        }}
                      >
                        {item.title}
                      </Box>
                    </Tooltip>
                  </TableCell>
                ) : (
                  <TableCell>
                    <Tooltip title={item.name}>
                      <Box
                        sx={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          maxWidth: "220px",
                        }}
                      >
                        {item.name}
                      </Box>
                    </Tooltip>
                  </TableCell>
                )}

                {(category === 'recruit' || category === 'blog') && (
                  <Tooltip title={item.company_name}>
                    <TableCell
                      sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: 180,
                      }}
                    >
                      {(item.company_name || '').replace(/\(.*?\)/g, '').trim()}
                    </TableCell>
                  </Tooltip>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PopularSection;
