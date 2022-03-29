import React, {useEffect}  from 'react'
import { Row, Col, Button, Descriptions, Image } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
export default function Detail(props) {

    return (
        <div className="pt-40 pb-10 container">

            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <h1 className='text-4xl mb-10'>Title</h1>
            </div>
            <br />
            <Row gutter={[16, 16]} >
                <Col lg={12} xs={24} className="text-center">
                    <Image  width={300} preview={false}
                        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                </Col>
                <Col lg={12} xs={24}>
                    <Descriptions title="Product Info" bordered>
                        <Descriptions.Item label="Price"> 1235456</Descriptions.Item>
                        <Descriptions.Item label="Sold">1</Descriptions.Item>
                        <Descriptions.Item label="View"> 0</Descriptions.Item>
                        <Descriptions.Item label="Description"> </Descriptions.Item>
                    </Descriptions>
                    <br />
                    <br />
                    <br />
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" shape="round" type="danger">
                            Add to Cart
                        </Button>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
