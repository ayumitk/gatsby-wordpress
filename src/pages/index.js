import React from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import SEO from "../components/seo"

const IndexPage = ({ data }) => {
  const posts = data.allWpPost.edges
  return (
    <Layout>
      <SEO title="Home" />
      <h2>Wordpressの記事をGatsbyで取得して表示</h2>
      {posts.map(({ node }) => (
        <div key={node.slug}>
          <div>{node.date}</div>
          <h3>
            <Link to={node.slug}>{node.title}</Link>
          </h3>
          <Img
            fixed={node.featuredImage.node.localFile.childImageSharp.fixed}
            alt={node.title}
          />
        </div>
      ))}
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query HomeQuery {
    allWpPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          date(formatString: "YYYY/MM/DD")
          slug
          title
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  fixed(width: 500, height: 500) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
