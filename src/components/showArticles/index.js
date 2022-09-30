import React from "react";
import { Row, Card, Col, Typography, Modal } from "antd";

const { Title } = Typography;

export default class ShowArticle extends React.Component {
    state = {
        articleDetail: undefined,
    };

    renderTitle(title) {
        return title.length < 15
            ? title
            : `${title.toString().substr(0, 15)}...`;
    }

    render() {
        const { articleDetail } = this.state;
        const { searchResults } = this.props;

        return (
            <>
                <Col>
                    <Title
                        style={{
                            fontSize: "24px",
                            textAlign: "center",
                            marginBottom: "50px",
                        }}
                    >
                        Search Results
                    </Title>

                    <Row justify="space-evenly" style={{ minWidth: "100%" }}>
                        {searchResults.map((result) => {
                            return (
                                <Card
                                    onClick={() =>
                                        this.setState({ articleDetail: result })
                                    }
                                    key={result._id}
                                    style={{
                                        borderRadius: "15px",
                                        maxWidth: "250px",
                                        minWidth: "30%",
                                        marginBottom: "3%",
                                    }}
                                    hoverable
                                    title={
                                        <h3>
                                            {this.renderTitle(result.title)}
                                        </h3>
                                    }
                                >
                                    {result.body}
                                </Card>
                            );
                        })}
                    </Row>

                    <Modal
                        title={articleDetail?.title}
                        style={{
                            minWidth: "40%",
                            maxWidth: "70%",
                        }}
                        open={articleDetail}
                        onCancel={() =>
                            this.setState({ articleDetail: undefined })
                        }
                        footer={[]}
                    >
                        <p>
                            <b>ID:</b> {articleDetail?._id}
                        </p>
                        <br />
                        <p>
                            <b>Content:</b> {articleDetail?.body}
                        </p>
                    </Modal>
                </Col>
            </>
        );
    }
}
