import { Divider, Grid, Stack, Typography } from "@mui/material";
import Company from "../../page/Company";
import CompanyCard from "./CompanyCard";
import axios from "axios";
import { useEffect, useState } from "react";


export default function RelatedCompany( { companyId } ) {

  console.log(companyId)
  const [data, setData] = useState([])
  
  useEffect(() => {
    if (!companyId) return;
    axios.get(`${process.env.REACT_APP_SERVER_URL}/api/company/${companyId}/relations`)
      .then(res => {
        setData(res.data)
        
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <Grid
      textAlign="start"
      sx={{
        width: '100%',
        py: 1.5,
        padding: 3,
        maxWidth: '900px',
        mx: 'auto',
      }}
    >
      <Divider />
    <Typography variant="h3" component="h3">
      이런 회사는 어떠세요?
    </Typography>
    
      <Stack
        direction="row"
        spacing={4}
        size={{
          xs: 12,
          md: 3,
        }}
        sx={{
          mt: 3,
        }}
      >
        {
          data.map(row => (
           <CompanyCard row={row} /> 
          ))
        }
      </Stack>
    </Grid>
  )
}