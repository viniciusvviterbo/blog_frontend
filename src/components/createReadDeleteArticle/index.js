import React from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import {
    createRandomUsers,
    createRandomArticles,
    getArticleByTitle,
    deleteAllUsers,
    deleteAllArticles,
} from "../../services/articleService";

export default class CreateReadDeleteArticle extends React.Component {
    state = {
        loading: false,
    };

    async createRandomUsers() {
        return createRandomUsers()
            .then(({ data }) => {
                notification.success({
                    message: `${data.insertedCount} users were randomly created`,
                });
            })
            .catch((failedResponse) => {
                notification.error({
                    message: `It was not possible to generate new users`,
                });
            });
    }

    async createRandomArticles() {
        return createRandomArticles()
            .then(({ data }) => {
                notification.success({
                    message: `${data.insertedCount} articles were randomly created`,
                });
            })
            .catch((failedResponse) => {
                notification.error({
                    message: `It was not possible to generate new articles`,
                });
            });
    }

    onCreateRandom() {
        this.createRandomUsers()
            .then(this.createRandomArticles)
            .catch((errorMessage) => {
                notification.error({
                    message: errorMessage,
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    async deleteAllUsers() {
        return deleteAllUsers()
            .then((req) => {
                notification.success({
                    message: `${req.data.deletedCount} users were deleted`,
                });
            })
            .catch((failedResponse) => {
                notification.error({
                    message: `It was not possible to delete users`,
                });
            });
    }

    async deleteAllArticles() {
        return deleteAllArticles()
            .then(({ data }) => {
                notification.success({
                    message: `${data.deletedCount} articles were deleted`,
                });
            })
            .catch((failedResponse) => {
                notification.error({
                    message: `It was not possible to delete articles`,
                });
            });
    }

    onDeleteAll() {
        this.deleteAllArticles()
            .then(this.deleteAllUsers)
            .catch((errorMessage) => {
                notification.error({
                    message: errorMessage,
                });
            })
            .finally(() => {
                this.props.afterChange();
                this.setState({ loading: false });
            });
    }

    onSearch(articleTitle) {
        getArticleByTitle(articleTitle)
            .then(({ data }) => {
                this.props.setArticlesShown(data);
            })
            .catch((failedResponse) => {
                notification.error({
                    message: `It was not possible to search for this article`,
                });
            })
            .finally(() => {
                this.setState({ loading: false });
            });
    }

    render() {
        const { loading } = this.state;

        return (
            <>
                <Row gutter={[24, 12]}>
                    <Col span={24}>
                        <Button
                            style={{
                                width: "100%",
                                borderRadius: "5px",
                                marginBottom: "30px",
                                marginTop: "20px",
                                backgroundColor: "#40A9FF",
                                color: "#FFF",
                            }}
                            onClick={() => {
                                this.setState({ loading: false });
                                this.onCreateRandom();
                            }}
                            loading={loading}
                        >
                            <b>Create Random Articles & Authors</b>
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Button
                            style={{
                                width: "100%",
                                borderRadius: "5px",
                                color: "#FFF",
                                marginBottom: "100px",
                                backgroundColor: "#ff4646",
                            }}
                            onClick={() => {
                                this.setState({ loading: false });
                                this.onDeleteAll();
                            }}
                            loading={loading}
                        >
                            <b>Delete All Articles & Authors</b>
                        </Button>
                    </Col>
                    <Col span={24}>
                        <Form
                            name="articleSearch"
                            initialValues={{}}
                            onFinish={(formVal) => {
                                this.setState({ loading: false });
                                this.onSearch(formVal.title);
                            }}
                        >
                            <Form.Item
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please inform the title.",
                                    },
                                    {
                                        pattern: /^\w[\w\s]*/,
                                        message:
                                            "Please enter a non-space-starting string",
                                    },
                                ]}
                            >
                                <Input
                                    placeholder="Search by Article Title"
                                    style={{ borderRadius: "5px" }}
                                />
                            </Form.Item>

                            <Button
                                htmlType="submit"
                                form="articleSearch"
                                style={{
                                    width: "100%",
                                    borderRadius: "5px",
                                    backgroundColor: "#48c02f",
                                    color: "#FFF",
                                }}
                            >
                                <b>Submit</b>
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </>
        );
    }
}
