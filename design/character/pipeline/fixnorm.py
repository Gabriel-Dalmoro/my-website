import bpy, sys
S=sys.argv[1]
exec(open(S+'/bind3.py').read().split("bpy.ops.wm.save_as_mainfile")[0])
m=[o for o in bpy.data.objects if o.type=='MESH'][0]
bpy.ops.object.select_all(action='DESELECT'); m.select_set(True); bpy.context.view_layer.objects.active=m
bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.normals_make_consistent(inside=False); bpy.ops.object.mode_set(mode='OBJECT')
print('det', m.matrix_world.determinant(), bpy.data.objects['Rig'].matrix_world.determinant())
bpy.ops.wm.save_as_mainfile(filepath=S+'/char/rigged.blend')
