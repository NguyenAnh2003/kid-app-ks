import React, { useEffect, useState } from 'react';
import globalStyle from '../styles/globalStyle';



// đây là file giả làm app thằng kid t bỏ đây tạm
// phải mount file này trước khi chọn map, kh là sẽ kh chạy được
// hiện tại mới chỉ foreground, để cho file này chạy background t bị lỗi mãi k làm đc

const ChildTest = () => {
  
  return (
    <View style={globalStyle.container}>
      <Text style={globalStyle.h1}>Đọc được dòng ni thì máy thằng kid bật r đó, qua mà check location</Text>
    </View>
  );
};

export default ChildTest;