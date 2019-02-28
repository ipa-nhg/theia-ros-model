
package de.fraunhofer.ipa.ros.ide.diagram

import de.fraunhofer.ipa.ros.model.ros.Node
import de.fraunhofer.ipa.ros.model.ros.PackageSet
import org.eclipse.sprotty.LayoutOptions
// import org.eclipse.sprotty.SEdge
import org.eclipse.sprotty.SGraph
import org.eclipse.sprotty.SLabel
import org.eclipse.sprotty.SNode
import org.eclipse.sprotty.xtext.IDiagramGenerator

class RosDiagramGenerator implements IDiagramGenerator {

	override generate(Context context) {
		(context.resource.contents.head as PackageSet).toSGraph(context)
	}

	def toSGraph(PackageSet packageset, extension Context context) {
		val nodes = packageset.package
				.map[package | package.artifact
					.map[artifact | artifact.node]
				].flatten.toList
		
		new SGraph [
			id = idCache.uniqueId(packageset, 'name')
			children = nodes.map[toSNode(context)]
		]
	}

	def SNode toSNode(Node node, extension Context context) {
		val theId = idCache.uniqueId(node, node.name) 
		new SNode [
			id = theId
			// #[] creates an immutable list
			children =  #[
				new SLabel [
					id = idCache.uniqueId(theId + '.label')
					text = node.name 
				]
			]
			layout = 'stack'
			layoutOptions = new LayoutOptions [
				paddingTop = 10.0
				paddingBottom = 10.0
				paddingLeft = 10.0
				paddingRight = 10.0

			]
		]
	}

} 