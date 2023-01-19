import React, { useEffect } from 'react'
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import axios from 'axios'
import Search from '../search';

const HomePage = () => {
    const [user,setUser]=useState([])

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
      clearFilters();
      setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div
          style={{
            padding: 8,
          }}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{
              marginBottom: 8,
              display: 'block',
            }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{
                width: 90,
              }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{
                width: 90,
              }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({
                  closeDropdown: false,
                });
                setSearchText(selectedKeys[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{
            color: filtered ? '#1890ff' : undefined,
          }}
        />
      ),
      onFilter: (value, record) =>
        record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{
              backgroundColor: '#ffc069',
              padding: 0,
            }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
    const columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        
        ...getColumnSearchProps('id'),
      },
      {
        title: 'Name',
        dataIndex: 'name',
        
        ...getColumnSearchProps('name'),
      },
      {
        title: 'E-mail',
        dataIndex: 'email',
        
        ...getColumnSearchProps('email'),
      },
      {
        title: 'Phone',
        dataIndex: 'phone',
       
        ...getColumnSearchProps('phone'),
      },
      {
        title: 'Website',
        dataIndex: 'website',
        
        ...getColumnSearchProps('website'),
      },
      {
        title: 'Username',
        dataIndex: 'username',
        ...getColumnSearchProps('username'),
        sorter: (a, b) => a.address.length - b.address.length,
        sortDirections: ['descend', 'ascend'],

       
      },
      {
        title:'Delete',
        render: (user) => (
            <Button type='primary' danger onClick={()=> handleDelete(user.id)}>
              {"Delete"}
            </Button>
           ),
      }
    ];
      
//   return (
//     <div>
        
//     </div>
//   )

  let getData = async()=>{
    const response = await axios.get('http://localhost:8000/users');
setUser(await response.data)
  }

  useEffect(()=>{
    getData()
  },[])

  const handleDelete=(id)=>{
     axios.delete(`http://localhost:8000/users/${id}`)
     const newList = user.filter((item) => item.id !== id);

     setUser(newList);
   
}
  return (
    <> 
    <Search setUser={setUser}/>
  <Table columns={columns} dataSource={user} rowKey={'id'} /></>

  )
}



export default HomePage