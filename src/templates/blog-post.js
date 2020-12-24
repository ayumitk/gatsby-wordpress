import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function BlogPost({ data }) {
  const post = data.allWpPost.nodes[0]
  console.log(post)
  return (
    <Layout>
      <div>{post.date}</div>
      <h1>{post.title}</h1>
      <Img
        fluid={post.featuredImage.node.localFile.childImageSharp.fluid}
        alt={post.title}
      />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </Layout>
  )
}
export const pageQuery = graphql`
  query WpPostBySlug($slug: String!) {
    allWpPost(filter: { slug: { eq: $slug } }) {
      nodes {
        date(formatString: "YYYY/MM/DD")
        slug
        title
        featuredImage {
          node {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
        content
      }
    }
  }
`
