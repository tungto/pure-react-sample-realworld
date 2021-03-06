import classnames from "classnames";
import {RComponent} from "../../../common/r-component";
import {Fragment} from "react";
import {Link} from "react-router-dom";
import {Pagination} from "./pagination";
import {ArticleList} from "./article-list";

export class PagingArticleList extends RComponent {

    constructor(props, context) {
        super(props, context);

        this.state = {
            page: 0,
            articlesCount: null,
        };
    }

    render() {
        const {api} = this.props;
        const {page, articlesCount} = this.state;

        return (
            <Fragment>
                <ArticleList
                    key={page}
                    api={() => api(page).then(({articles, articlesCount}) => {
                        if (this.state.articlesCount == null) {
                            this.setState({articlesCount});
                        }
                        return articles;
                    })}
                />

                {!!articlesCount && Math.ceil(articlesCount/10) > 1 && (
                    <Pagination
                        total={Math.ceil(articlesCount/10)}
                        current={page}
                        onChange={(page) => this.setState({page})}
                    />
                )}
            </Fragment>
        );
    }
}