import React from "react";
import { Form, Input, Button, Col, Typography, notification } from "antd";
import { editArticle } from "../../services/articleService";

const { TextArea } = Input;
const { Title } = Typography;



export default class UpdateArticle extends React.Component {
    state = {
        loading: false,
    };

    onConcludeArticle(formVal) {
        this.setState({ loading: true });

        editArticle(formVal)
            .then((response) => {
                if (
                    response.data.acknowledged &&
                    response.data.matchedCount &&
                    response.data.modifiedCount
                ) {
                    notification.success({
                        message: `Article updated successfully`,
                    });
                } else if (!response.data.matchedCount) {
                    notification.info({
                        message: `The article with the specified ID could not be found`,
                    });
                } else if (!response.data.modifiedCount) {
                    notification.info({
                        message: `The article could not be updated`,
                    });
                }
            })
            .catch((response) => {
                notification.error({
                    message: response.response.data.errors.message,
                });
            })
            .finally(() => {
                document.getElementById("articleUpdate").reset();
                this.props.afterUpdate()
                this.setState({ loading: false })
            });
    }

    render() {
        return (
            <>
                <Col>
                    <Title
                        style={{
                            fontSize: "24px",
                            textAlign: "center",
                        }}
                    >
                        Update Article
                    </Title>

                    <Form
                        name="articleUpdate"
                        initialValues={{}}
                        onFinish={(formVal) => this.onConcludeArticle(formVal)}
                    >
                        <Form.Item
                            name="id"
                            rules={[
                                {
                                    required: true,
                                    message: "Please inform the ID.",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Article ID"
                                style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="title"
                            rules={[
                                {
                                    required: false,
                                    message: "Please inform the title.",
                                },
                            ]}
                        >
                            <Input
                                placeholder="Title"
                                style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="body"
                            rules={[
                                {
                                    required: true,
                                    message: "Please inform the body.",
                                },
                            ]}
                        >
                            <TextArea
                                placeholder="Body"
                                autoSize={{ minRows: 5, maxRows: 5 }}
                                style={{ borderRadius: "5px" }}
                            />
                        </Form.Item>
                        <Button
                            //type="primary"
                            htmlType="submit"
                            form="articleUpdate"
                            style={{
                                width: "100%",
                                borderRadius: "5px",
                                backgroundColor: "#ffc446",
                                color: "#FFF",
                            }}
                        >
                            <b>Submit</b>
                        </Button>
                    </Form>
                </Col>
            </>
        );
    }
}
