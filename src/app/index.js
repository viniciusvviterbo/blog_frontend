import React from "react";
import { Space, Col, Row } from "antd";
import "./index.css";
import UpdateArticle from "../components/updateArticle";
import CreateReadDeleteArticle from "../components/createReadDeleteArticle";
import ShowArticle from "../components/showArticles";

export default class App extends React.Component {
    state = {
        searchResults: [],
    };

    setArticlesShown(newArticles) {
        this.setState({
            searchResults: newArticles,
        });
    }

    render() {
        const { searchResults } = this.state;

        return (
            <Space
                direction="vertical"
                style={{
                    width: "100%",
                    marginTop: "30px",
                    marginBottom: "30px",
                }}
                align="center"
            >
                <Row
                    style={{ width: "100%" }}
                    justify="space-between"
                    span={20}
                >
                    <Col span={10}>
                        <UpdateArticle
                            afterUpdate={() => this.setArticlesShown([])}
                        />
                    </Col>
                    <Col span={10}>
                        <CreateReadDeleteArticle
                        
                            setArticlesShown={(newArticles) =>
                                this.setArticlesShown(newArticles)
                            }

                            afterChange={() => this.setArticlesShown([])}
                        />
                    </Col>
                </Row>
                <Row
                    style={{ marginTop: "50px", width: "100%" }}
                    justify="space-between"
                    span={20}
                >
                    <Col>
                        <ShowArticle searchResults={searchResults} />
                    </Col>
                </Row>
            </Space>
        );
    }
}
