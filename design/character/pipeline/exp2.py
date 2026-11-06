import bpy, sys
S, out, opt = sys.argv[1], sys.argv[2], sys.argv[3]
bpy.ops.wm.open_mainfile(filepath=S+'/char/rigged.blend')
arm=bpy.data.objects['Rig']; arm.animation_data.action=None
for mt in bpy.data.materials:
    try: mt.surface_render_method='DITHERED'
    except Exception: pass
    try: mt.blend_method='OPAQUE'
    except Exception: pass
    if mt.use_nodes:
        for n in mt.node_tree.nodes:
            if n.type=='BSDF_PRINCIPLED':
                a=n.inputs['Alpha']
                for l in list(a.links): mt.node_tree.links.remove(l)
                a.default_value=1.0
for img in bpy.data.images:
    if img.size[0]>1024: img.scale(1024,1024)
bpy.ops.object.select_all(action='SELECT')
kw=dict(filepath=out, export_format='GLB', export_animation_mode='ACTIONS', export_image_format='JPEG')
if opt=='plain': pass
if opt=='nosample': kw.update(export_force_sampling=False)
bpy.ops.export_scene.gltf(**kw)
