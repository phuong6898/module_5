import logo from './logo.svg';
import './App.css';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from "@mui/material";

function App() {
  const id = "C09"
  const students = [
    {
      id: 1,
      name: "John Doe",
      address: "John Doe",
      point: 9
    },
    {
      id: 2,
      name: "Trương Tấn hải",
      address: "Việt Nam",
      point: 10
    },
    {
      id: 3,
      name: "Leonel messi",
      address: "Inter Miami",
      point: 10
    },
    {
      id: 4,
      name: "Cristiano Ronaldo",
      address: "Saudi Arabia",
      point: 7
    }
    ];
  return (
      <div style={{ width: "80%", margin: "auto", marginTop: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Danh sách sinh viên
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>
                  <b>Mã sinh viên</b>
                </TableCell>
                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>
                  <b>Họ và tên</b>
                </TableCell>
                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>
                  <b>Địa chỉ</b>
                </TableCell>
                <TableCell sx={{ backgroundColor: 'black', color: 'white' }}>
                  <b>Điểm</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {students.map((student, index) => (
                  <TableRow
                      key={student.id}
                      sx={{
                        backgroundColor: index % 2 === 0 ? 'white' : 'grey.200',
                        '&:hover': {
                          backgroundColor: 'grey.400'
                        }
                      }}
                  >
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.address}</TableCell>
                    <TableCell>{student.point}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default App;
