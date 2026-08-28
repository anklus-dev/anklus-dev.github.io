---
title: Vector Embedding Cosine Similarities
draft: false
date: 2026-08-27
---
# Geometrical Semantics: Understanding Vector Embedding Cosine Similarities

In machine learning and Natural Language Processing (NLP), a vector embedding is a high-dimensional mathematical representation of semantic meaning. Words, documents, or consumer profiles are projected into a continuous vector space where distance represents conceptual similarity. 

To measure how conceptually similar two embeddings are, we calculate the cosine similarity—the cosine of the angle between their respective vectors.

## From Geometry to AI Ethics: The Semantic Trap

While cosine similarity is a highly efficient tool for search and recommendation systems, it also exposes how AI models codify human bias. 

Because embedding algorithms train on historical human text, they map words based on human patterns. If we calculate the similarity vectors between professions and gender, we might find biased clusters:

$$\cos(\vec{man}, \vec{doctor}) \approx \cos(\vec{woman}, \vec{nurse})$$

This is where technical representation crosses directly into algorithmic bias. If a recruiting AI uses cosine similarity to match resumes to job descriptions, it will quietly favor resumes that structurally align with historically biased vector clusters, reinforcing systemic inequalities under the guise of objective mathematics.