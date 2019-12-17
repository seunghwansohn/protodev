import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image
} from "@react-pdf/renderer";

const POSTER_PATH = "https://image.tmdb.org/t/p/w154";

const styles = StyleSheet.create({
  page: {
    backgroundColor: "#ffffff"
  },
  section: {
    margin: 200,
    padding: 10,
    flexGrow: 1
  },
  movieContainer: {
    backgroundColor: "#f6f6f5",
    display: "flex",
    flexDirection: "row",
    padding: 5
  },
  movieDetails: {
    display: "flex",
    marginLeft: 5
  },
  movieTitle: {
    fontSize: 15,
    marginBottom: 10
  },
  movieOverview: {
    fontSize: 10
  },

  image: {
    height: 200,
    width: 150
  },
  subtitle: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    width: 150,
    alignItems: "center",
    marginBottom: 12
  },
  vote: {
    display: "flex",
    flexDirection: "row"
  },
  rating: {
    height: 10,
    width: 10
  },
  vote_text: {
    fontSize: 10
  },
  vote_pop: {
    fontSize: 10,
    padding: 2,
    backgroundColor: "#61C74F",
    color: "#fff"
  },
  vote_pop_text: {
    fontSize: 10,
    marginLeft: 4
  },
  overviewContainer: {
    minHeight: 110
  },
  detailsFooter: {
    display: "flex",
    flexDirection: "row"
  },
  lang: {
    fontSize: 8,
    fontWeight: 700
  },
  vote_average: {
    fontSize: 20,
    marginLeft: 4,
    fontWeight: "bold"
  }
});

export function PdfDocument1() {
    const iiii = 'dfdf'
    const eeee = 'feef'
  return (
    <Document>
         <Page size="A4">
            <Text>asdfasdf</Text>
         </Page>
    </Document>
  );
}